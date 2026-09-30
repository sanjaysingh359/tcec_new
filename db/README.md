# MPR portal — databases

The portal hosts three applications. Each one has its **own PostgreSQL database**, chosen on the
landing page; users, institutes and monthly data never mix between them.

| Application | Database | Current data (full copy) |
|---|---|---|
| Report-TCEC | `dcmsme_tcec` | `db/dumps/dcmsme_tcec.sql` |
| Report-TCSP | `dcmsme_tcsp` | `db/dumps/dcmsme_tcsp.sql` |
| Report-AB   | `dcmsme_tool` | `db/dumps/dcmsme_tool.sql` |

Each `.sql` file is a complete plain-SQL export (all tables, keys, sequences and rows) made with
`pg_dump`. Loading one recreates that database exactly.

Requirements on the computer: **PostgreSQL 17** (server running) and its `psql` / `createdb`
tools — either in `E:\postgresql17\pgsql\bin`, `C:\Program Files\PostgreSQL\17\bin`, or on `PATH`.

---

## 1. Import on a new computer (recommended — one step)

1. Pull the repository.
2. Copy the three dump files you were given into **`db\dumps\`** (see section 4).
3. Double-click **`db\setup_databases.bat`** and type the PostgreSQL `postgres` password when asked.

The script, for each of the three databases:

- creates it if it does **not** exist yet, then loads `db\dumps\<database>.sql`;
- leaves it **untouched** if it already exists (nothing is overwritten);
- creates `backend\config\application.properties` (database addresses + password) if the
  computer has none.

Then start the backend with `backend\start_backend.bat`. Every application whose database now
exists opens on the landing page.

## 2. Replace an existing database with the latest data

`setup_databases.bat` never overwrites. To bring a computer that already has a database up to date,
stop the backend, drop that database, then run the setup again:

```bat
set PGBIN=E:\postgresql17\pgsql\bin
"%PGBIN%\dropdb.exe"  -h 127.0.0.1 -U postgres dcmsme_tcsp
db\setup_databases.bat
```

(Replace `dcmsme_tcsp` with the database to refresh. **Dropping deletes the data in it** — export
it first if it holds anything not in the dump.)

## 3. Manual import (without the script)

```bat
set PGBIN=E:\postgresql17\pgsql\bin
"%PGBIN%\createdb.exe" -h 127.0.0.1 -U postgres -T template0 -E UTF8 dcmsme_tcec
"%PGBIN%\psql.exe"     -h 127.0.0.1 -U postgres -d dcmsme_tcec -f db\dumps\dcmsme_tcec.sql
```

Repeat for `dcmsme_tcsp` and `dcmsme_tool` with their files. If the backend has no
`backend\config\application.properties`, create it:

```properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5432/dcmsme_tcec
spring.datasource.username=postgres
spring.datasource.password=<postgres password>
app.list=tcec,tcsp,ab
app.datasource.tcsp.url=jdbc:postgresql://127.0.0.1:5432/dcmsme_tcsp
app.datasource.ab.url=jdbc:postgresql://127.0.0.1:5432/dcmsme_tool
```

## 4. Export (update the files in `db/dumps`)

Run **`db\export_databases.bat`** on the computer that holds the up-to-date data. It rewrites the
three files (the previous copy of each is kept locally as `.sql.bak`).

**The dump files are not in git** — they hold all real data, including login password hashes.
Hand them over privately (shared drive / USB / encrypted archive) and put them in the other
computer's `db\dumps\` folder before running `setup_databases.bat`.

---

### Other files here

- `setup_databases.bat` / `export_databases.bat` — the import / export scripts above.
- `tcsp/`, `ab/` — the original starting databases (legacy TCSP dump converted to PostgreSQL; empty
  AB schema with admin logins). Used only when `db/dumps` has no file for that database.
- `migrate/` — `mysql_to_pg.py`, copies data from the legacy MySQL servers into these databases.
- `migrations/`, `testdata/` — one-off schema change and report test data.

`db/dumps/` is git-ignored: the dumps contain real data, including login password hashes.
