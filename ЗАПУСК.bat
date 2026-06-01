@echo off
chcp 65001 >nul
cd /d "%~dp0"

if exist "portal\package.json" (
  cd portal
  goto run
)

echo.
echo  Папка portal не найдена рядом с этим файлом.
echo  Должно быть:  ...\arhiv-...\portal\package.json
echo.
pause
exit /b 1

:run
echo.
echo  Запуск сайта из: %CD%
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo  Установите Node.js: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo  npm install...
  call npm install
)

if not exist dist (
  echo  npm run build...
  call npm run build
)

echo.
echo  Откроется окно CGA Server — НЕ ЗАКРЫВАЙТЕ его.
echo.

start "CGA Server" cmd /k "cd /d %CD% && set NODE_ENV=production && node server/index.mjs"
timeout /t 4 /nobreak >nul
start "" "http://127.0.0.1:8080/"

echo  Сайт: http://127.0.0.1:8080/
echo  Админ: /staff  код ARHIV-VKO-2026  пароль admin2026
echo.
pause
