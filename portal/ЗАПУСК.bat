@echo off
cd /d "%~dp0"
set NODE_ENV=production
if not exist node_modules call npm install
if not exist dist call npm run build
start "CGA Server" cmd /k "cd /d %CD% && set NODE_ENV=production && node server/index.mjs"
timeout /t 4 /nobreak >nul
start "" "http://127.0.0.1:8080/"
echo Готово. Окно CGA Server не закрывайте.
pause
