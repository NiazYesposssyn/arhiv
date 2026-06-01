@echo off
chcp 65001 >nul
cd /d "%~dp0"

if exist "portal\package.json" goto launch
if exist "arhiv-cursor-continue-our-site-10a4\portal\package.json" (
  cd arhiv-cursor-continue-our-site-10a4
  goto launch
)

echo.
echo  Откройте папку portal в проводнике
echo  и дважды щёлкните:  portal\ЗАПУСК.bat
echo.
pause
exit /b 1

:launch
cd portal
call ЗАПУСК.bat
