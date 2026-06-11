@echo off
echo ======================================================
echo   TCEC API Backend  ^|  Spring Boot 3 + PostgreSQL 17
echo ======================================================
echo.

set JAVA_HOME=E:\jdk21\jdk-21.0.5+11
set MAVEN_HOME=E:\maven\apache-maven-3.9.9
set PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%

echo [1/2] Making sure PostgreSQL is running...
"E:\postgresql17\pgsql\bin\pg_ctl.exe" -D "E:\postgresql17\data" status 2>nul
if errorlevel 1 (
    echo     Starting PostgreSQL...
    "E:\postgresql17\pgsql\bin\pg_ctl.exe" -D "E:\postgresql17\data" -l "E:\postgresql17\pg.log" start
    timeout /t 3 /nobreak >nul
)

echo.
echo [2/2] Starting Spring Boot API on port 8082...
echo   API URL : http://localhost:8082/api
echo   Press Ctrl+C to stop
echo.

cd /d "%~dp0"
"%JAVA_HOME%\bin\java.exe" -jar target\tcec-api-1.0.0.jar

pause
