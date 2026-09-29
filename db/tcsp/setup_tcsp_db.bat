@echo off
rem Creates the TCSP database (dcmsme_tcsp) for the MPR app from the legacy TCSP dump.
rem psql asks for the postgres password; nothing is stored in this file.
setlocal
set "PGBIN=E:\postgresql17\pgsql\bin"
if not exist "%PGBIN%\psql.exe" set "PGBIN=C:\Program Files\PostgreSQL\17\bin"
cd /d "%~dp0"
echo Creating database dcmsme_tcsp ...
"%PGBIN%\createdb.exe" -h 127.0.0.1 -U postgres dcmsme_tcsp
if errorlevel 1 echo (database may already exist - continuing)
echo Loading TCSP tables and data ...
"%PGBIN%\psql.exe" -h 127.0.0.1 -U postgres -d dcmsme_tcsp -v ON_ERROR_STOP=0 -q -f 01_dcmsme_tcsp_schema_data.sql
echo Aligning schema with the MPR app ...
"%PGBIN%\psql.exe" -h 127.0.0.1 -U postgres -d dcmsme_tcsp -v ON_ERROR_STOP=1 -q -f 02_align_schema_with_tcec.sql
echo.
echo Done. Restart the backend (start_backend.bat); TCSP then becomes available on the landing page.
pause
