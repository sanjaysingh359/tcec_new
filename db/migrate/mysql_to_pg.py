"""
mysql_to_pg.py - copy the data of a legacy MySQL/MariaDB database into the
PostgreSQL database of the new MPR app.

The PostgreSQL schema is the master: the tool never creates or alters tables.
For every table that exists on both sides it copies the columns both sides
share (names matched case-insensitively), converting each value to the target
column's type. Tables / columns that exist only in PostgreSQL (new-app
features) are left alone; ones that exist only in MySQL are reported.

Source is either
  * a live server   --mysql  mysql://user:pass@host:3306/dcmsme_tcec
  * a dump file     --dump   mysql_dump.sql        (mysqldump / HeidiSQL / phpMyAdmin)

The whole run is ONE transaction: if any table fails, nothing is changed.

Examples
  python db/migrate/mysql_to_pg.py --dump mysql_dump.sql --pg postgresql://postgres@127.0.0.1:5432/dcmsme_tcec --dry-run
  python db/migrate/mysql_to_pg.py --mysql mysql://root@legacy-host/dcmsme_tcec --pg postgresql://postgres@127.0.0.1/dcmsme_tcec
  python db/migrate/mysql_to_pg.py --dump old.sql --pg ... --tables tbl_financial,tbl_placement --mode append

Renamed columns go in column_map.txt next to this script (see that file).

Passwords: put them in the URL, or set MYSQL_PWD / PGPASSWORD, or you are asked.
Needs:  pip install -r db/migrate/requirements.txt
"""
import argparse
import getpass
import os
import re
import sys
from collections import defaultdict
from urllib.parse import urlparse, unquote

import psycopg

ZERO_DATE = re.compile(r"^0000-00-00")
INT_TYPES = {"smallint", "integer", "bigint"}
NUM_TYPES = {"numeric", "real", "double precision"}
DATE_TYPES = {"date", "timestamp without time zone", "timestamp with time zone",
              "time without time zone", "time with time zone"}
# used when MySQL has NULL / an unusable value but the PostgreSQL column is NOT NULL
NOT_NULL_FALLBACK = {"int": "0", "num": "0", "date": "1900-01-01", "bool": False,
                     "bytea": b"", "text": ""}


# ─── sources: each yields (table, [column names], row iterator) ─────────────

class MySQLSource:
    """Live MySQL / MariaDB server. Values come back as raw strings (conv={})
    so both sources hand the converter the same thing."""

    def __init__(self, url):
        import pymysql
        import pymysql.cursors
        u = urlparse(url)
        password = unquote(u.password) if u.password else os.environ.get("MYSQL_PWD")
        if password is None:
            password = getpass.getpass(f"MySQL password for {u.username}@{u.hostname}: ")
        self.db = u.path.lstrip("/")
        self.conn = pymysql.connect(host=u.hostname or "127.0.0.1", port=u.port or 3306,
                                    user=unquote(u.username or "root"), password=password,
                                    database=self.db, charset="utf8mb4", conv={},
                                    cursorclass=pymysql.cursors.SSCursor)

    def tables(self):
        with self.conn.cursor() as c:
            c.execute("SELECT table_name FROM information_schema.tables "
                      "WHERE table_schema=%s AND table_type='BASE TABLE'", (self.db,))
            return [r[0] if isinstance(r[0], str) else r[0].decode() for r in c.fetchall()]

    def count(self, table):
        with self.conn.cursor() as c:
            c.execute(f"SELECT COUNT(*) FROM `{table}`")
            return int(c.fetchone()[0])

    def read(self, table):
        c = self.conn.cursor()
        c.execute(f"SELECT * FROM `{table}`")
        cols = [d[0] for d in c.description]

        def rows():
            try:
                for r in c:
                    yield r
            finally:
                c.close()
        return cols, rows()


class DumpSource:
    """A mysqldump-style .sql file: CREATE TABLE gives the column order,
    INSERT INTO ... VALUES (...),(...); gives the rows."""

    TOKEN = re.compile(r"""\s*(?:
          (?P<null>NULL)
        | (?:_binary\s*)?'(?P<str>(?:[^'\\]|\\.|'')*)'
        | (?P<hex>0x[0-9A-Fa-f]*)
        | (?P<num>[-+]?[0-9.]+(?:[eE][-+]?[0-9]+)?)
        )\s*(?P<sep>[,)])""", re.X | re.S)
    ESC = {"0": "\0", "b": "\b", "n": "\n", "r": "\r", "t": "\t", "Z": "\x1a"}

    def __init__(self, path):
        with open(path, encoding="utf-8-sig", errors="replace") as f:
            text = f.read()
        self.columns, self.data = {}, defaultdict(list)
        for m in re.finditer(r"CREATE TABLE\s+`?(\w+)`?\s*\((.*?)\n\)[^;]*;", text, re.S | re.I):
            self.columns[m.group(1)] = re.findall(r"^\s*`([^`]+)`", m.group(2), re.M)
        pos = 0
        ins = re.compile(r"INSERT\s+(?:IGNORE\s+)?INTO\s+`?(\w+)`?\s*(\([^)]*\))?\s*VALUES\s*", re.I)
        while True:
            m = ins.search(text, pos)
            if not m:
                break
            table = m.group(1)
            cols = re.findall(r"`?(\w+)`?", m.group(2)) if m.group(2) else None
            pos = self._values(text, m.end(), table, cols)

    def _unescape(self, s):
        s = s.replace("''", "'")
        return re.sub(r"\\(.)", lambda m: self.ESC.get(m.group(1), m.group(1)), s, flags=re.S)

    def _values(self, text, pos, table, cols):
        rows = self.data[table]
        while True:                                   # one "( ... )" tuple per loop
            while text[pos] in " \t\r\n,":
                pos += 1
            if text[pos] == ";":
                return pos + 1
            if text[pos] != "(":
                raise ValueError(f"dump: unexpected {text[pos:pos+40]!r} in INSERT for {table}")
            pos += 1
            row = []
            while True:
                m = self.TOKEN.match(text, pos)
                if not m:
                    raise ValueError(f"dump: cannot parse value near {text[pos:pos+60]!r} ({table})")
                if m.group("null"):
                    row.append(None)
                elif m.group("str") is not None:
                    row.append(self._unescape(m.group("str")))
                elif m.group("hex"):
                    row.append(bytes.fromhex(m.group("hex")[2:]))
                else:
                    row.append(m.group("num"))
                pos = m.end()
                if m.group("sep") == ")":
                    break
            if cols:                                  # explicit column list: reorder to table order
                d = dict(zip(cols, row))
                row = [d.get(c) for c in self.columns.get(table, cols)]
            rows.append(row)

    def tables(self):
        return list(self.columns)

    def count(self, table):
        return len(self.data.get(table, []))

    def read(self, table):
        return self.columns[table], iter(self.data.get(table, []))


# ─── target (PostgreSQL) metadata ───────────────────────────────────────────

def pg_columns(pg, schema):
    """{table: {column: (data_type, max_len, nullable, default)}}"""
    out = defaultdict(dict)
    rows = pg.execute("""
        SELECT c.table_name, c.column_name, c.data_type, c.character_maximum_length,
               c.is_nullable = 'YES', c.column_default
        FROM information_schema.columns c
        JOIN information_schema.tables t USING (table_schema, table_name)
        WHERE c.table_schema = %s AND t.table_type = 'BASE TABLE'
        ORDER BY c.table_name, c.ordinal_position""", (schema,)).fetchall()
    for t, c, typ, ln, nullable, default in rows:
        out[t][c] = (typ, ln, nullable, default)
    return out


def kind(pgtype):
    if pgtype in INT_TYPES:
        return "int"
    if pgtype in NUM_TYPES:
        return "num"
    if pgtype in DATE_TYPES:
        return "date"
    if pgtype == "boolean":
        return "bool"
    if pgtype == "bytea":
        return "bytea"
    return "text"


# ─── value conversion ───────────────────────────────────────────────────────

class Converter:
    """Turns one raw MySQL value into something PostgreSQL's column accepts.
    Every lossy change is counted so the report can show it."""

    def __init__(self, table, col, info):
        self.table, self.col = table, col
        self.type, self.maxlen, self.nullable, _ = info
        self.kind = kind(self.type)
        self.issues = defaultdict(int)

    def __call__(self, v):
        v = self._convert(v)
        if v is None and not self.nullable:
            self.issues["NULL -> default (column is NOT NULL)"] += 1
            v = NOT_NULL_FALLBACK[self.kind]
        return v

    def _convert(self, v):
        if v is None:
            return None
        k = self.kind
        if k == "bytea":
            return v if isinstance(v, bytes) else str(v).encode("utf-8")
        if isinstance(v, (bytes, bytearray)):
            if k == "bool" and len(v) == 1:            # MySQL bit(1)
                return v != b"\x00"
            v = v.decode("utf-8", errors="replace")
        v = str(v)
        if k == "text":
            if "\0" in v:
                self.issues["NUL characters removed"] += 1
                v = v.replace("\0", "")
            if self.maxlen and len(v) > self.maxlen:
                self.issues[f"truncated to {self.maxlen} chars"] += 1
                v = v[:self.maxlen]
            return v
        s = v.strip()
        if s == "":
            return None
        if k == "date":
            if ZERO_DATE.match(s):
                self.issues["zero date 0000-00-00 -> NULL"] += 1
                return None
            return s
        if k == "bool":
            return s.lower() not in ("0", "f", "false", "n", "no", "")
        try:
            f = float(s.replace(",", ""))
        except ValueError:
            self.issues[f"not a number ({s[:20]!r}...) -> NULL"] += 1
            return None
        if k == "int":
            if f != int(f):
                self.issues["decimal rounded to integer"] += 1
            return str(int(round(f)))
        return s.replace(",", "")


# ─── main ───────────────────────────────────────────────────────────────────

def load_column_map(path):
    """column_map.txt lines:  table.column = pg_column   (table may be *)"""
    out = {}
    if path and os.path.exists(path):
        for line in open(path, encoding="utf-8"):
            line = line.split("#", 1)[0].strip()
            if line:
                left, right = (x.strip().lower() for x in line.split("=", 1))
                out[tuple(left.split(".", 1))] = right
    return out


def target_column(table, col, lower, cmap):
    """PostgreSQL column for a MySQL column: same name, else a column_map.txt rename."""
    c = col.lower()
    if c in lower:
        return lower[c]
    for key in ((table, c), ("*", c)):
        if key in cmap and cmap[key] in lower:
            return lower[cmap[key]]
    return None


def connect_pg(url):
    u = urlparse(url)
    kw = {}
    if not u.password and not os.environ.get("PGPASSWORD"):
        kw["password"] = getpass.getpass(f"PostgreSQL password for {u.username or 'postgres'}@{u.hostname}: ")
    return psycopg.connect(url, **kw)


def reset_sequences(pg, schema, table, colinfo):
    """Move every nextval() sequence used by the table past its MAX value,
    so new rows inserted by the app don't collide with migrated ones."""
    for col, (_, _, _, default) in colinfo.items():
        m = re.search(r"nextval\('([^']+)'", default or "")
        if m:
            pg.execute(f'SELECT setval(%s, COALESCE((SELECT MAX("{col}") FROM "{schema}"."{table}"), 0) + 1, false)',
                       (m.group(1),))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    src = ap.add_mutually_exclusive_group(required=True)
    src.add_argument("--mysql", help="mysql://user[:pass]@host[:port]/database")
    src.add_argument("--dump", help="path of a mysqldump .sql file")
    ap.add_argument("--pg", required=True, help="postgresql://user[:pass]@host[:port]/database")
    ap.add_argument("--schema", default="public")
    ap.add_argument("--tables", help="comma list: only these tables")
    ap.add_argument("--exclude", help="comma list: skip these tables")
    ap.add_argument("--mode", choices=["replace", "append"], default="replace",
                    help="replace = empty each target table first (default); append = add rows")
    ap.add_argument("--map", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "column_map.txt"),
                    help="column rename file (default: column_map.txt beside this script)")
    ap.add_argument("--dry-run", action="store_true", help="show the plan and run everything, then roll back")
    a = ap.parse_args()

    only = {t.strip().lower() for t in a.tables.split(",")} if a.tables else None
    skip = {t.strip().lower() for t in a.exclude.split(",")} if a.exclude else set()

    print("Reading source ...")
    source = MySQLSource(a.mysql) if a.mysql else DumpSource(a.dump)
    pg = connect_pg(a.pg)
    target = pg_columns(pg, a.schema)
    cmap = load_column_map(a.map)

    src_tables = {t.lower(): t for t in source.tables()}
    plan = [t for t in sorted(src_tables) if (only is None or t in only) and t not in skip]
    missing = [t for t in plan if t not in target]
    plan = [t for t in plan if t in target]
    if only:
        for t in sorted(only - set(src_tables)):
            print(f"  ! {t}: not in the MySQL source")

    # FK checks / triggers off for this session, so load order does not matter
    pg.execute("SET session_replication_role = replica")

    report, problems = [], []
    for t in plan:
        cols, rows = source.read(src_tables[t])
        tcols = target[t]
        lower = {c.lower(): c for c in tcols}
        mapped = [(i, c, target_column(t, c, lower, cmap)) for i, c in enumerate(cols)]
        idx = [(i, pc) for i, _, pc in mapped if pc]
        dropped = [c for _, c, pc in mapped if not pc]
        fed = {pc for _, pc in idx}
        unfed = [c for c, (_, _, nullable, default) in tcols.items()
                 if c not in fed and not nullable and default is None]
        if unfed:
            raise ValueError(f"{t}: PostgreSQL column(s) {', '.join(unfed)} are NOT NULL without a default "
                             f"and get no MySQL data. Add a rename to column_map.txt, or --exclude {t}.")
        convs = [Converter(t, pc, tcols[pc]) for _, pc in idx]

        if a.mode == "replace":
            pg.execute(f'DELETE FROM "{a.schema}"."{t}"')
        n = 0
        collist = ", ".join(f'"{pc}"' for _, pc in idx)
        with pg.cursor() as cur:
            with cur.copy(f'COPY "{a.schema}"."{t}" ({collist}) FROM STDIN') as cp:
                for r in rows:
                    cp.write_row([cv(r[i]) for (i, _), cv in zip(idx, convs)])
                    n += 1
        reset_sequences(pg, a.schema, t, tcols)

        loaded = pg.execute(f'SELECT COUNT(*) FROM "{a.schema}"."{t}"').fetchone()[0]
        report.append((t, source.count(src_tables[t]), loaded, n))
        if dropped:
            problems.append(f"{t}: MySQL columns not in PostgreSQL (not copied): {', '.join(dropped)}")
        for cv in convs:
            for msg, cnt in cv.issues.items():
                problems.append(f"{t}.{cv.col}: {cnt} x {msg}")

    # ── report ──
    print(f"\n{'table':40} {'mysql':>9} {'copied':>9} {'pg now':>9}")
    for t, s, loaded, n in report:
        flag = "" if s == n else "   <-- MISMATCH"
        print(f"{t:40} {s:9} {n:9} {loaded:9}{flag}")
    print(f"\n{len(report)} tables, {sum(r[3] for r in report):,} rows copied")
    if missing:
        print(f"\nIn MySQL but not in PostgreSQL (skipped): {', '.join(missing)}")
    untouched = sorted(set(target) - set(src_tables))
    if untouched:
        print(f"Only in PostgreSQL (left as is): {', '.join(untouched)}")
    if problems:
        print("\nData adjustments / warnings:")
        for p in problems:
            print("  -", p)

    if a.dry_run:
        pg.rollback()
        print("\nDRY RUN - rolled back, PostgreSQL unchanged.")
    else:
        pg.commit()
        print("\nCommitted.")


if __name__ == "__main__":
    try:
        main()
    except (psycopg.Error, ValueError) as e:
        print(f"\nFAILED - nothing was changed.\n{e}", file=sys.stderr)
        sys.exit(1)
