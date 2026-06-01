@echo off
chcp 65001 >nul
cd /d "%~dp0portal"
if not exist package.json (
  echo Папка portal не найдена.
  pause
  exit /b 1
)
where node >nul 2>&1
if errorlevel 1 (
  echo Установите Node.js: https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules call npm install
if not exist dist call npm run build
start "" "http://127.0.0.1:8080/"
echo.
echo  Сайт ЦГА ВКО — http://127.0.0.1:8080/
echo  Админка: /staff  код ARHIV-VKO-2026  пароль admin2026
echo.
call npm start
pause
