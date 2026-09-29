@echo off
setlocal EnableExtensions
rem ======================================================================
rem  MPR portal - create the application databases (one per application)
rem
rem    TCEC  -> dcmsme_tcec   postgresDb\dcmsme_tcec_dump.sql
rem    TCSP  -> dcmsme_tcsp   db\tcsp\01_*.sql + db\tcsp\02_*.sql
rem    AB    -> dcmsme_tool   db\ab\01_*.sql   + db\ab\02_*.sql  (when available)
rem
rem  A database that already exists is left untouched (no data is overwritten).
rem  If db\dumps\<database>.sql exists (a newer full copy), it is loaded instead.
rem  Asks once for the PostgreSQL password; nothing is stored except in
rem  backend\config\application.properties, and only if that file is missing.
rem
rem  Optional: set PGHOST / PGPORT / PGUSER / PGPASSWORD before running.
rem ======================================================================

cd /d "%~dp0.."
set "ROOT=%CD%"
set "LOG=%ROOT%\db\setup_databases.log"
if not defined PGHOST set "PGHOST=127.0.0.1"
if not defined PGPORT set "PGPORT=5432"
if not defined PGUSER set "PGUSER=postgres"

echo ======================================================
echo   MPR portal  ^|  database setup
echo ======================================================
echo.

rem ---- PostgreSQL client tools ------------------------------------------
set "PGBIN="
for %%D in ("E:\postgresql17\pgsql\bin" "C:\Program Files\PostgreSQL\17\bin" "C:\Program Files\PostgreSQL\16\bin") do (
    if not defined PGBIN if exist "%%~D\psql.exe" set "PGBIN=%%~D"
)
if not defined PGBIN for %%X in (psql.exe) do if not "%%~$PATH:X"=="" set "PGBIN=%%~dp$PATH:X"
if not defined PGBIN (
    echo ERROR: psql.exe not found. Install PostgreSQL 17 or add its bin folder to PATH.
    pause & exit /b 1
)
if "%PGBIN:~-1%"=="\" set "PGBIN=%PGBIN:~0,-1%"
echo   PostgreSQL tools : %PGBIN%
echo   Server           : %PGUSER%@%PGHOST%:%PGPORT%
echo.

rem ---- password (typed hidden, asked once) --------------------------------
if not defined PGPASSWORD (
    for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "$s = Read-Host 'PostgreSQL password for %PGUSER%' -AsSecureString; [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))"`) do set "PGPASSWORD=%%P"
)

"%PGBIN%\psql.exe" -d postgres -tAc "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: cannot connect to PostgreSQL as %PGUSER% on %PGHOST%:%PGPORT%.
    echo        Check that the server is running and the password is right.
    pause & exit /b 1
)
echo   Connected.
echo.
echo MPR database setup %DATE% %TIME% > "%LOG%"

rem ---- the three applications -------------------------------------------
call :setup dcmsme_tcec TCEC "postgresDb\dcmsme_tcec_dump.sql"
call :setup dcmsme_tcsp TCSP "db\tcsp\01_dcmsme_tcsp_schema_data.sql" "db\tcsp\02_align_schema_with_tcec.sql"
call :setup dcmsme_tool AB   "db\ab\01_dcmsme_tool_schema_data.sql" "db\ab\02_align_schema_with_tcec.sql"

rem ---- backend configuration (only when this computer has none) ----------
if exist "backend\config\application.properties" (
    echo   Backend config   : backend\config\application.properties already exists - left as is.
) else (
    if not exist "backend\config" mkdir "backend\config"
    powershell -NoProfile -Command ^
      "$h=$env:PGHOST; $p=$env:PGPORT; $lines=@(" ^
      "('spring.datasource.url=jdbc:postgresql://' + $h + ':' + $p + '/dcmsme_tcec')," ^
      "('spring.datasource.username=' + $env:PGUSER)," ^
      "('spring.datasource.password=' + $env:PGPASSWORD)," ^
      "'app.list=tcec,tcsp,ab'," ^
      "('app.datasource.tcsp.url=jdbc:postgresql://' + $h + ':' + $p + '/dcmsme_tcsp')," ^
      "('app.datasource.ab.url=jdbc:postgresql://' + $h + ':' + $p + '/dcmsme_tool'));" ^
      "Set-Content -Path 'backend\config\application.properties' -Value $lines -Encoding ASCII"
    echo   Backend config   : created backend\config\application.properties
)

echo.
echo Done. Details are in db\setup_databases.log
echo Start (or restart) the backend with backend\start_backend.bat.
echo Applications whose database now exists open on the landing page.
echo.
pause
exit /b 0


rem ======================================================================
rem  :setup <database> <app> <file> [<file> ...]
rem  (no "=" inside the for /f query below: cmd would treat it as a separator)
rem ======================================================================
:setup
set "DB=%~1"
set "APP=%~2"
shift & shift

rem does the database exist? (count written to a temp file: "=" and "()" break for /f)
set "EXISTS=0"
"%PGBIN%\psql.exe" -d postgres -tAc "SELECT count(*) FROM pg_database WHERE datname ~ '^%DB%$'" > "%TEMP%\mpr_dbcheck.txt" 2>nul
set /p EXISTS=<"%TEMP%\mpr_dbcheck.txt"
del "%TEMP%\mpr_dbcheck.txt" >nul 2>&1
if "%EXISTS%"=="1" (
    echo   [%APP%] %DB% already exists - left untouched.
    exit /b 0
)

rem newest full copy, if one was exported to db\dumps
if exist "db\dumps\%DB%.sql" (
    call :create || exit /b 1
    call :load "db\dumps\%DB%.sql"
    goto :setup_done
)

if not exist "%~1" (
    echo   [%APP%] %DB% - no data file yet ^(%~1^) - skipped.
    exit /b 0
)

call :create || exit /b 1
:setup_files
if "%~1"=="" goto :setup_done
if exist "%~1" call :load "%~1"
shift
goto :setup_files

:setup_done
echo   [%APP%] %DB% created.
exit /b 0


:create
echo   [%APP%] creating %DB% ...
"%PGBIN%\createdb.exe" -T template0 -E UTF8 "%DB%" >> "%LOG%" 2>&1
if errorlevel 1 (
    echo   [%APP%] ERROR: could not create %DB% - see db\setup_databases.log
    exit /b 1
)
exit /b 0


:load
echo   [%APP%]   loading %~1
echo --- %DB%: %~1 >> "%LOG%"
"%PGBIN%\psql.exe" -d "%DB%" -q -v ON_ERROR_STOP=0 -f "%~1" >> "%LOG%" 2>&1
exit /b 0
