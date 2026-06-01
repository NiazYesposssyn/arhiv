@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  Обновление с GitHub (ветка cursor/continue-our-site-10a4)...
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo  Git не установлен.
  echo  Скачайте проект заново с:
  echo  https://github.com/NiazYesposssyn/arhiv/archive/refs/heads/cursor/continue-our-site-10a4.zip
  pause
  exit /b 1
)

git fetch origin cursor/continue-our-site-10a4
git checkout cursor/continue-our-site-10a4 2>nul
git pull origin cursor/continue-our-site-10a4

echo.
echo  Готово. Запустите: npm start
echo  Проверка: http://127.0.0.1:8080/api/health
echo.
pause
