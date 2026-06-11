"""
migrate_to_pg.py  — MariaDB/MySQL → PostgreSQL 17 migration
Database: dcmsme_tcec
"""
import re, sys

INPUT  = r"E:\others\java\tcec_new\mysql_dump.sql"
OUTPUT = r"E:\others\java\tcec_new\pg_migration.sql"

# ── Read dump (utf-8-sig strips BOM) ────────────────────────────────────────
print(f"Reading {INPUT} …")
with open(INPUT, encoding="utf-8-sig", errors="replace") as f:
    raw = f.read()

lines = raw.splitlines()      # handles both \n and \r\n
print(f"  {len(lines):,} lines read")

# ── helpers ─────────────────────────────────────────────────────────────────
def unbkt(s):
    """Remove MySQL backtick quoting."""
    return s.replace("`", "")

TYPE_MAP = [
    (r"\bmediumint\s*\(\d+\)",  "integer"),
    (r"\bbigint\s*\(\d+\)",     "bigint"),
    (r"\bsmallint\s*\(\d+\)",   "smallint"),
    (r"\btinyint\s*\(\d+\)",    "smallint"),
    (r"\btinyint\b",            "smallint"),
    (r"\bint\s*\(\d+\)",        "integer"),
    (r"\bdouble\b",             "double precision"),
    (r"\bfloat\b",              "real"),
    (r"\bdatetime\b",           "timestamp"),
    (r"\blongtext\b",           "text"),
    (r"\bmediumtext\b",         "text"),
    (r"\btinytext\b",           "text"),
    (r"\blongblob\b",           "bytea"),
    (r"\bmediumblob\b",         "bytea"),
    (r"\btinyblob\b",           "bytea"),
    (r"\bblob\b",               "bytea"),
    (r"\benum\s*\([^)]*\)",     "varchar(100)"),
    (r"\bset\s*\([^)]*\)",      "varchar(255)"),
    (r"\byear\s*\(\d+\)",       "smallint"),
    (r"\byear\b",               "smallint"),
    (r"\bbit\s*\(\d+\)",        "boolean"),
]

TABLE_OPTS = re.compile(
    r"(?:ENGINE|TYPE|AUTO_INCREMENT|AVG_ROW_LENGTH|ROW_FORMAT|PACK_KEYS|"
    r"CHECKSUM|DELAY_KEY_WRITE|MAX_ROWS|MIN_ROWS|STATS_PERSISTENT|"
    r"DEFAULT\s+CHARSET|CHARSET|COLLATE|COMMENT)\s*=\s*\S+",
    re.I
)

def convert_create(block_lines):
    """Convert a CREATE TABLE block (list of raw lines) to PG SQL."""
    block = "\n".join(block_lines)

    # ── remove backtick quoting ───────────────────────────────────────────
    block = unbkt(block)

    # ── column / index modifiers ──────────────────────────────────────────
    block = re.sub(r"\s+AUTO_INCREMENT\b(?!\s*=)", " ", block, flags=re.I)
    block = re.sub(r"\s+unsigned\b", "", block, flags=re.I)
    block = re.sub(r"\s+COLLATE\s+\S+", "", block, flags=re.I)
    block = re.sub(r"\s+CHARACTER\s+SET\s+\S+", "", block, flags=re.I)
    block = re.sub(r"\s+ON\s+UPDATE\s+CURRENT_TIMESTAMP(?:\s*\(\))?", "", block, flags=re.I)

    # ── data type substitutions ───────────────────────────────────────────
    for pat, rep in TYPE_MAP:
        block = re.sub(pat, rep, block, flags=re.I)

    # ── drop standalone KEY/INDEX lines (non-UNIQUE, non-PRIMARY) ───────
    #   KEY `idx` (`col`),   or   FULLTEXT KEY ...
    block = re.sub(
        r",\s*\n(\s*)(?:(?:FULLTEXT|SPATIAL)\s+)?(?:KEY|INDEX)\s+\S+\s*\([^)]+\)(?:\s+USING\s+\w+)?",
        "",
        block,
        flags=re.I | re.MULTILINE
    )

    # ── convert UNIQUE KEY name(cols) → UNIQUE (cols) ─────────────────────
    block = re.sub(
        r"\bUNIQUE\s+KEY\s+\S+\s*(\([^)]+\))",
        r"UNIQUE \1",
        block,
        flags=re.I
    )

    # ── remove USING BTREE / USING HASH from PRIMARY KEY and UNIQUE ───────
    block = re.sub(r"\s+USING\s+(?:BTREE|HASH|GIST|GIN|BRIN)\b", "", block, flags=re.I)

    # ── close line: strip ALL table options including COMMENT='...' ───────
    # This replaces ") any_table_options;" → ");"
    block = re.sub(
        r"\)\s+(?:ENGINE|TYPE|AUTO_INCREMENT|AVG_ROW_LENGTH|ROW_FORMAT|PACK_KEYS|"
        r"CHECKSUM|DELAY_KEY_WRITE|MAX_ROWS|MIN_ROWS|STATS_PERSISTENT|"
        r"DEFAULT\s+CHARSET|CHARSET|COLLATE|COMMENT)\s*[=\s][^;]+;",
        ");",
        block,
        flags=re.I
    )

    # ── clean dangling commas before ) ───────────────────────────────────
    block = re.sub(r",(\s*\))", r"\1", block)

    return block + "\n"


# ── main pass ────────────────────────────────────────────────────────────────
out        = []
i          = 0
in_create  = False
create_buf = []
dbg_tables = []

# Lines/patterns to drop outright
SKIP_STARTS = (
    "/*!",
    "SET @OLD_", "SET @saved", "SET @`",
    "SET TIME_ZONE", "SET SQL_MODE", "SET FOREIGN_KEY_CHECKS",
    "SET UNIQUE_CHECKS", "SET CHARACTER_SET", "SET NAMES",
    "LOCK TABLES", "UNLOCK TABLES",
)

def should_skip(s):
    for p in SKIP_STARTS:
        if s.startswith(p):
            return True
    return False

while i < len(lines):
    line    = lines[i]
    stripped = line.strip()

    # ── lines to discard entirely ──────────────────────────────────────────
    if should_skip(stripped):
        i += 1
        continue

    # ── inside a CREATE TABLE block ────────────────────────────────────────
    if in_create:
        create_buf.append(line)
        # End of block: line starts with ")" (possibly with ENGINE=... after)
        if stripped.startswith(")") and stripped.endswith(";"):
            pg_block = convert_create(create_buf)
            out.append(pg_block)
            in_create  = False
            create_buf = []
        i += 1
        continue

    # ── CREATE TABLE (start) ───────────────────────────────────────────────
    if re.match(r"CREATE\s+TABLE\b", stripped, re.I):
        in_create  = True
        tbl_name = re.search(r"CREATE\s+TABLE\s+`?(\w+)`?", stripped, re.I)
        if tbl_name:
            dbg_tables.append(tbl_name.group(1))
        create_buf = [line]
        i += 1
        continue

    # ── DROP TABLE IF EXISTS ───────────────────────────────────────────────
    if re.match(r"DROP\s+TABLE\s+IF\s+EXISTS\b", stripped, re.I):
        out.append(unbkt(stripped))
        out.append("")
        i += 1
        continue

    # ── VIEW stub block (/*!50001 CREATE VIEW ... */) ─────────────────────
    if re.match(r"/\*!50001\s+CREATE", stripped, re.I):
        view_lines = []
        while i < len(lines):
            vl = lines[i]
            view_lines.append(vl)
            if vl.strip().endswith("*/;"):
                break
            i += 1
        view_sql = "\n".join(view_lines)
        view_sql = re.sub(r"/\*!\d+\s*",  "", view_sql)
        view_sql = re.sub(r"\s*\*/;?\s*$", ";", view_sql.rstrip())
        view_sql = unbkt(view_sql)
        out.append("-- VIEW")
        out.append(view_sql)
        out.append("")
        i += 1
        continue

    # ── INSERT INTO ────────────────────────────────────────────────────────
    if re.match(r"INSERT\s+INTO\b", stripped, re.I):
        insert = unbkt(stripped)
        # MySQL uses \' inside string literals → '' for PG
        insert = re.sub(r"\\'", "''", insert)
        # MySQL zero-dates (invalid in PG) → sentinel placeholder
        insert = insert.replace("'0000-00-00 00:00:00'", "'1900-01-01 00:00:00'")
        insert = insert.replace("'0000-00-00'",          "'1900-01-01'")
        out.append(insert)
        i += 1
        continue

    # ── comment lines  ── keep ────────────────────────────────────────────
    if stripped.startswith("--"):
        out.append(stripped)
        i += 1
        continue

    # ── blank lines ── keep ───────────────────────────────────────────────
    if stripped == "":
        out.append("")
        i += 1
        continue

    # ── everything else → silently skip ──────────────────────────────────
    i += 1

# ── write output ─────────────────────────────────────────────────────────────
header = """\
-- ============================================================
-- PostgreSQL 17 migration of dcmsme_tcec
-- Source: MariaDB 10.4  →  Target: PostgreSQL 17
-- ============================================================

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

"""

print(f"Writing {OUTPUT} …")
with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(header)
    f.write("\n".join(out))
    f.write("\n-- ===== End of migration =====\n")

size_kb = round(len("\n".join(out)) / 1024, 1)
print(f"Done — {size_kb} KB written")
print(f"Tables processed: {len(dbg_tables)}")
print("Tables:", ", ".join(dbg_tables[:20]), "…" if len(dbg_tables) > 20 else "")
