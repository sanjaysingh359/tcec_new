@echo off
setlocal EnableExtensions
rem ======================================================================
rem  MPR portal - back up the application databases (current data)
rem
rem    dcmsme_tcec  -> db\dumps\dcmsme_tcec.sql   (TCEC)
rem    dcmsme_tcsp  -> db\dumps\dcmsme_tcsp.sql   (TCSP)
rem    dcmsme_tool  -> db\dumps\dcmsme_tool.sql   (AB)
rem
rem  Each file is a complete plain-SQL copy (tables + data). On another
rem  computer, db\setup_databases.bat loads these files in preference to the
rem  original data, so copying the db\dumps folder moves the latest data.
rem  The previous copy of each file is kept as <name>.sql.bak.
rem  Asks once for the PostgreSQL password (typed hidden).
rem ======================================================================

cd /d "%~dp0.."
if not defined PGHOST set "PGHOST=127.0.0.1"
if not defined PGPORT set "PGPORT=5432"
if not defined PGUSER set "PGUSER=postgres"

echo ======================================================
echo   MPR portal  ^|  database backup
echo ======================================================
echo.

set "PGBIN="
for %%D in ("E:\postgresql17\pgsql\bin" "C:\Program Files\PostgreSQL\17\bin" "C:\Program Files\PostgreSQL\16\bin") do (
    if not defined PGBIN if exist "%%~D\pg_dump.exe" set "PGBIN=%%~D"
)
if not defined PGBIN for %%X in (pg_dump.exe) do if not "%%~$PATH:X"=="" set "PGBIN=%%~dp$PATH:X"
if not defined PGBIN (
    echo ERROR: pg_dump.exe not found. Install PostgreSQL 17 or add its bin folder to PATH.
    pause & exit /b 1
)
if "%PGBIN:~-1%"=="\" set "PGBIN=%PGBIN:~0,-1%"

if not defined PGPASSWORD (
    for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "$s = Read-Host 'PostgreSQL password for %PGUSER%' -AsSecureString; [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))"`) do set "PGPASSWORD=%%P"
)
"%PGBIN%\psql.exe" -d postgres -tAc "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo ERROR: cannot connect to PostgreSQL as %PGUSER% on %PGHOST%:%PGPORT%.
    pause & exit /b 1
)

if not exist "db\dumps" mkdir "db\dumps"
set "FAILED=0"
call :dump dcmsme_tcec TCEC
call :dump dcmsme_tcsp TCSP
call :dump dcmsme_tool AB

echo.
if "%FAILED%"=="0" (echo Done. Backups are in db\dumps\) else (echo Finished with errors - see messages above.)
echo.
pause
exit /b 0


:dump
rem skip a database that does not exist on this computer
set "EXISTS=0"
"%PGBIN%\psql.exe" -d postgres -tAc "SELECT count(*) FROM pg_database WHERE datname ~ '^%~1$'" > "%TEMP%\mpr_dbcheck.txt" 2>nul
set /p EXISTS=<"%TEMP%\mpr_dbcheck.txt"
del "%TEMP%\mpr_dbcheck.txt" >nul 2>&1
if not "%EXISTS%"=="1" (
    echo   [%~2] %~1 does not exist here - skipped.
    exit /b 0
)
if exist "db\dumps\%~1.sql" move /y "db\dumps\%~1.sql" "db\dumps\%~1.sql.bak" >nul
"%PGBIN%\pg_dump.exe" --no-owner --no-privileges --encoding=UTF8 -f "db\dumps\%~1.sql" "%~1" 2>nul
if errorlevel 1 (
    echo   [%~2] ERROR: backup of %~1 failed.
    if exist "db\dumps\%~1.sql.bak" move /y "db\dumps\%~1.sql.bak" "db\dumps\%~1.sql" >nul
    set "FAILED=1"
    exit /b 0
)
for %%F in ("db\dumps\%~1.sql") do echo   [%~2] %~1 -^> db\dumps\%~1.sql  (%%~zF bytes)
exit /b 0
