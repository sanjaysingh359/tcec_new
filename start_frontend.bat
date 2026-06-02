@echo off
title TCEC React Frontend

set PATH=E:\nodejs\node-v22.16.0-win-x64;%PATH%
set TEMP=E:\tmp
set TMP=E:\tmp

echo Starting React dev server...
cd /D "%~dp0frontend"
npm run dev

pause
