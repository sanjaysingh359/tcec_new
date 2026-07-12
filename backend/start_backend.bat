@echo off
echo ======================================================
echo   TCEC API Backend  ^|  Spring Boot 3 + PostgreSQL 17
echo ======================================================
echo.

:: ── Try to find Java ──────────────────────────────────
if defined JAVA_HOME (
    set JAVA_EXE=%JAVA_HOME%\bin\java.exe
) else (
    where java >nul 2>&1
    if %errorlevel% == 0 (
        set JAVA_EXE=java
    ) else (
        echo ERROR: Java not found. Set JAVA_HOME or add java to PATH.
        pause & exit /b 1
    )
)

:: ── Try to start PostgreSQL (multiple common locations) ─
echo [1/2] Making sure PostgreSQL is running...

set PG_CTL=
if exist "E:\postgresql17\pgsql\bin\pg_ctl.exe"         set PG_CTL=E:\postgresql17\pgsql\bin\pg_ctl.exe
if exist "C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" set PG_CTL=C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe
if exist "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" set PG_CTL=C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe
if exist "C:\Program Files\PostgreSQL\15\bin\pg_ctl.exe" set PG_CTL=C:\Program Files\PostgreSQL\15\bin\pg_ctl.exe

set PG_DATA=
if exist "E:\postgresql17\data\PG_VERSION"  set PG_DATA=E:\postgresql17\data
if exist "C:\Program Files\PostgreSQL\17\data\PG_VERSION" set PG_DATA=C:\Program Files\PostgreSQL\17\data
if exist "C:\Program Files\PostgreSQL\16\data\PG_VERSION" set PG_DATA=C:\Program Files\PostgreSQL\16\data
if exist "C:\Program Files\PostgreSQL\15\data\PG_VERSION" set PG_DATA=C:\Program Files\PostgreSQL\15\data

if defined PG_CTL (
    if defined PG_DATA (
        "%PG_CTL%" -D "%PG_DATA%" status >nul 2>&1
        if errorlevel 1 (
            echo     Starting PostgreSQL...
            "%PG_CTL%" -D "%PG_DATA%" -l "%PG_DATA%\..\pg.log" start
            timeout /t 3 /nobreak >nul
        ) else (
            echo     PostgreSQL is already running.
        )
    ) else (
        echo     WARNING: PostgreSQL data directory not found. Make sure PostgreSQL is running manually.
    )
) else (
    echo     WARNING: pg_ctl not found. Trying Windows service...
    net start postgresql-x64-17 >nul 2>&1
    net start postgresql-x64-16 >nul 2>&1
    net start postgresql-x64-15 >nul 2>&1
)

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
