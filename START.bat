@echo off
chcp 65001 >nul
cd /d "%~dp0"

REM --- найти папку portal ---
if exist "portal\package.json" (
  cd portal
  goto run
)
if exist "arhiv-cursor-continue-our-site-10a4\portal\package.json" (
  cd arhiv-cursor-continue-our-site-10a4\portal
  goto run
)
for /d %%D in (*) do (
  if exist "%%D\portal\package.json" (
    cd "%%D\portal"
    goto run
  )
)

echo.
echo  Не найдена папка portal с package.json
echo  Скачайте новую версию:
echo  https://github.com/NiazYesposssyn/arhiv/archive/refs/heads/cursor/continue-our-site-10a4.zip
echo.
pause
exit /b 1

:run
echo.
echo  Запуск из: %CD%
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo  Установите Node.js LTS: https://nodejs.org/
  echo  После установки перезапустите компьютер.
  pause
  exit /b 1
)

if not exist node_modules (
  echo  Установка зависимостей...
  call npm install
  if errorlevel 1 (
    echo  Ошибка npm install
    pause
    exit /b 1
  )
)

if not exist dist (
  echo  Сборка сайта...
  call npm run build
  if errorlevel 1 (
    echo  Ошибка сборки
    pause
    exit /b 1
  )
)

echo  Запуск сервера в отдельном окне...
echo  Не закрывайте окно "CGA Server"
echo.

set NODE_ENV=production
start "CGA Server" cmd /k "cd /d %CD% && set NODE_ENV=production && node server/index.mjs"

echo  Ожидание сервера...
timeout /t 4 /nobreak >nul

start "" "http://127.0.0.1:8080/"

echo.
echo  Сайт: http://127.0.0.1:8080/
echo  Если не открылся — обновите страницу F5
echo  Админ: /staff  код ARHIV-VKO-2026  пароль admin2026
echo.
pause
