@echo off
echo ======================================================
echo   TCEC API Backend  ^|  Spring Boot 3 + PostgreSQL 17
echo ======================================================
echo.

:: ── Find Java 21 (preferred) — check known paths before JAVA_HOME ──
set JAVA_EXE=

if exist "E:\jdk21\jdk-21.0.5+11\bin\java.exe"                        set "JAVA_EXE=E:\jdk21\jdk-21.0.5+11\bin\java.exe"
if not defined JAVA_EXE if exist "C:\Program Files\Java\jdk-21\bin\java.exe"                    set "JAVA_EXE=C:\Program Files\Java\jdk-21\bin\java.exe"
if not defined JAVA_EXE if exist "C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin\java.exe" set "JAVA_EXE=C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin\java.exe"
if not defined JAVA_EXE if exist "C:\Program Files\Microsoft\jdk-21.0.5.11-hotspot\bin\java.exe" set "JAVA_EXE=C:\Program Files\Microsoft\jdk-21.0.5.11-hotspot\bin\java.exe"

:: Fallback to JAVA_HOME
if not defined JAVA_EXE (
    if defined JAVA_HOME (
        if exist "%JAVA_HOME%\bin\java.exe" set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
    )
)

:: Last resort: java in PATH
if not defined JAVA_EXE (
    where java >nul 2>&1
    if %errorlevel% == 0 (
        set "JAVA_EXE=java"
    ) else (
        echo ERROR: Java not found.
        echo Please install JDK 21 to C:\Program Files\Java\jdk-21
        pause & exit /b 1
    )
)

echo     Java: %JAVA_EXE%

:: ── PostgreSQL: check if already accepting connections ──
echo.
echo [1/2] Making sure PostgreSQL is running...

set "PSQL_EXE="
if exist "E:\postgresql17\pgsql\bin\psql.exe"          set "PSQL_EXE=E:\postgresql17\pgsql\bin\psql.exe"
if not defined PSQL_EXE if exist "C:\Program Files\PostgreSQL\17\bin\psql.exe" set "PSQL_EXE=C:\Program Files\PostgreSQL\17\bin\psql.exe"
if not defined PSQL_EXE if exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" set "PSQL_EXE=C:\Program Files\PostgreSQL\16\bin\psql.exe"

if defined PSQL_EXE (
    set PGPASSWORD=postgres123
    "%PSQL_EXE%" -h 127.0.0.1 -U postgres -c "SELECT 1;" >nul 2>&1
    if %errorlevel% == 0 (
        echo     PostgreSQL is already running. OK.
        goto START_APP
    )
)

:: Not running — try pg_ctl
set "PG_CTL="
set "PG_DATA="
if exist "E:\postgresql17\pgsql\bin\pg_ctl.exe"          set "PG_CTL=E:\postgresql17\pgsql\bin\pg_ctl.exe"
if not defined PG_CTL if exist "C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" set "PG_CTL=C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe"
if not defined PG_CTL if exist "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" set "PG_CTL=C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe"

if exist "E:\postgresql17\data\PG_VERSION"               set "PG_DATA=E:\postgresql17\data"
if not defined PG_DATA if exist "C:\Program Files\PostgreSQL\17\data\PG_VERSION" set "PG_DATA=C:\Program Files\PostgreSQL\17\data"
if not defined PG_DATA if exist "C:\Program Files\PostgreSQL\16\data\PG_VERSION" set "PG_DATA=C:\Program Files\PostgreSQL\16\data"

if defined PG_CTL if defined PG_DATA (
    echo     Starting PostgreSQL via pg_ctl...
    "%PG_CTL%" -D "%PG_DATA%" -l "%PG_DATA%\..\pg.log" start
    timeout /t 4 /nobreak >nul
    goto START_APP
)

echo     Trying Windows service...
net start postgresql-x64-17 >nul 2>&1
net start postgresql-x64-16 >nul 2>&1
timeout /t 3 /nobreak >nul

:START_APP
echo.
echo [2/2] Starting Spring Boot API on port 8082...
echo   API URL : http://localhost:8082/api
echo   Press Ctrl+C to stop
echo.

cd /d "%~dp0"

if not exist target\tcec-api-1.0.0.jar (
    echo ERROR: JAR file not found at target\tcec-api-1.0.0.jar
    echo Please build the project first: mvn clean package -DskipTests
    pause & exit /b 1
)

"%JAVA_EXE%" -jar target\tcec-api-1.0.0.jar

pause
