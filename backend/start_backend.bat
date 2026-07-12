@echo off
echo ======================================================
echo   TCEC API Backend  ^|  Spring Boot 3 + PostgreSQL 17
echo ======================================================
echo.

:: ── Try to find Java 21 specifically, then fallback ────
set JAVA_EXE=

:: Check JAVA_HOME first
if defined JAVA_HOME (
    if exist "%JAVA_HOME%\bin\java.exe" set JAVA_EXE=%JAVA_HOME%\bin\java.exe
)

:: Common JDK 21 install locations
if not defined JAVA_EXE if exist "E:\jdk21\jdk-21.0.5+11\bin\java.exe"                          set JAVA_EXE=E:\jdk21\jdk-21.0.5+11\bin\java.exe
if not defined JAVA_EXE if exist "C:\Program Files\Java\jdk-21\bin\java.exe"                    set JAVA_EXE=C:\Program Files\Java\jdk-21\bin\java.exe
if not defined JAVA_EXE if exist "C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin\java.exe" set JAVA_EXE=C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin\java.exe
if not defined JAVA_EXE if exist "C:\Program Files\Microsoft\jdk-21.0.5.11-hotspot\bin\java.exe" set JAVA_EXE=C:\Program Files\Microsoft\jdk-21.0.5.11-hotspot\bin\java.exe

:: Fallback: whatever java is in PATH
if not defined JAVA_EXE (
    where java >nul 2>&1
    if %errorlevel% == 0 ( set JAVA_EXE=java ) else (
        echo ERROR: Java not found.
        echo Please install JDK 21 from: https://adoptium.net
        echo Then set JAVA_HOME to the JDK 21 folder and retry.
        pause & exit /b 1
    )
)

:: Warn if Java version is too old
for /f "tokens=3" %%v in ('"%JAVA_EXE%" -version 2^>^&1 ^| findstr /i "version"') do set JAVA_VER=%%v
echo     Java: %JAVA_EXE%
echo     Version string: %JAVA_VER%

:: ── PostgreSQL: check if already accepting connections ──
echo.
echo [1/2] Making sure PostgreSQL is running...

:: Find psql to test connection
set PSQL_EXE=
if exist "E:\postgresql17\pgsql\bin\psql.exe"          set PSQL_EXE=E:\postgresql17\pgsql\bin\psql.exe
if exist "C:\Program Files\PostgreSQL\17\bin\psql.exe" set PSQL_EXE=C:\Program Files\PostgreSQL\17\bin\psql.exe
if exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" set PSQL_EXE=C:\Program Files\PostgreSQL\16\bin\psql.exe
if exist "C:\Program Files\PostgreSQL\15\bin\psql.exe" set PSQL_EXE=C:\Program Files\PostgreSQL\15\bin\psql.exe

if defined PSQL_EXE (
    set PGPASSWORD=postgres123
    "%PSQL_EXE%" -h 127.0.0.1 -U postgres -c "SELECT 1;" >nul 2>&1
    if %errorlevel% == 0 (
        echo     PostgreSQL is already running. OK.
        goto START_APP
    )
)

:: Not running — try pg_ctl
set PG_CTL=
if exist "E:\postgresql17\pgsql\bin\pg_ctl.exe"         set PG_CTL=E:\postgresql17\pgsql\bin\pg_ctl.exe
if exist "C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" set PG_CTL=C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe
if exist "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" set PG_CTL=C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe

set PG_DATA=
if exist "E:\postgresql17\data\PG_VERSION"               set PG_DATA=E:\postgresql17\data
if exist "C:\Program Files\PostgreSQL\17\data\PG_VERSION" set PG_DATA=C:\Program Files\PostgreSQL\17\data
if exist "C:\Program Files\PostgreSQL\16\data\PG_VERSION" set PG_DATA=C:\Program Files\PostgreSQL\16\data

if defined PG_CTL if defined PG_DATA (
    echo     Starting PostgreSQL via pg_ctl...
    "%PG_CTL%" -D "%PG_DATA%" -l "%PG_DATA%\..\pg.log" start
    timeout /t 4 /nobreak >nul
    goto START_APP
)

:: Last resort: Windows service
echo     Trying Windows service...
net start postgresql-x64-17 >nul 2>&1
net start postgresql-x64-16 >nul 2>&1
net start postgresql-x64-15 >nul 2>&1
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
