@echo off
chcp 65001 >nul
cd /d "%~dp0"

if exist package.json (
  call "%~dp0START.bat"
  exit /b 0
)

if exist "arhiv-cursor-continue-our-site-10a4\package.json" (
  cd "arhiv-cursor-continue-our-site-10a4"
  call START.bat
  exit /b 0
)

echo.
echo  Не найден package.json
echo  Откройте папку, где лежит package.json, и запустите START.bat
echo.
pause
