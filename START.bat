@echo off
chcp 65001 >nul
cd /d "%~dp0"

if exist package.json goto run

for /d %%D in (*) do (
  if exist "%%D\package.json" (
    cd "%%D"
    goto run
  )
)

echo package.json не найден.
pause
exit /b 1

:run
echo.
echo  ЦГА ВКО — запуск из: %CD%
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

echo  Сайт откроется в браузере. Заявки — без Supabase.
echo  Панель заявок: http://127.0.0.1:8080/panel.html
echo.

start "" "http://127.0.0.1:8080/"
timeout /t 2 /nobreak >nul
call npm start
if errorlevel 1 (
  echo.
  echo  ОШИБКА запуска. Скопируйте текст выше и отправьте в чат.
  pause
  exit /b 1
)
pause
