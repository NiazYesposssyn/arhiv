@echo off
chcp 65001 >nul
cd /d "%~dp0"

if exist package.json goto run

echo.
echo  package.json не найден в этой папке:
echo  %CD%
echo.
echo  Откройте папку, где лежат index.html и package.json
echo  (часто это вложенная папка arhiv-cursor-continue-our-site-10a4).
echo.

for /d %%D in (*) do (
  if exist "%%D\package.json" (
    echo  Найден проект в: %%D
    cd "%%D"
    goto run
  )
)

pause
exit /b 1

:run
echo.
echo  Запуск сайта из: %CD%
echo  Откройте в браузере: http://127.0.0.1:8080/
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo  ОШИБКА: Node.js не установлен.
  echo  Скачайте: https://nodejs.org/
  pause
  exit /b 1
)

npm start
pause
