@echo off
chcp 65001 >nul
set LOG=%~dp0ОШИБКА-ЗАПУСКА.txt
cd /d "%~dp0"
echo === Запуск %date% %time% === > "%LOG%"
echo Папка: %CD%>> "%LOG%"

if not exist "portal\package.json" (
  echo НЕТ папки portal\package.json >> "%LOG%"
  echo.
  echo  ОШИБКА: рядом с этим файлом должна быть папка portal
  echo  Смотрите файл: ОШИБКА-ЗАПУСКА.txt
  echo.
  notepad "%LOG%"
  pause
  exit /b 1
)

cd portal
echo portal OK >> "%LOG%"

where node >> "%LOG%" 2>&1
if errorlevel 1 (
  echo Node.js НЕ УСТАНОВЛЕН >> "%LOG%"
  echo.
  echo  Установите Node.js LTS: https://nodejs.org/
  echo  Галочка "Add to PATH", потом ПЕРЕЗАГРУЗКА ПК
  echo.
  notepad "%LOG%"
  pause
  exit /b 1
)

echo npm install... >> "%LOG%"
call npm install >> "%LOG%" 2>&1
if errorlevel 1 (
  echo npm install FAILED >> "%LOG%"
  notepad "%LOG%"
  pause
  exit /b 1
)

if not exist dist (
  echo npm run build... >> "%LOG%"
  call npm run build >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo build FAILED >> "%LOG%"
    notepad "%LOG%"
    pause
    exit /b 1
  )
)

echo START SERVER >> "%LOG%"
echo.
echo  ========================================
echo    Сейчас откроется окно CGA Server
echo    ЕГО НЕ ЗАКРЫВАЙТЕ
echo  ========================================
echo.

set NODE_ENV=production
start "CGA Server" cmd /k "title CGA Server && cd /d %CD% && set NODE_ENV=production && node server/index.mjs && echo. && echo Сервер остановлен. && pause"

timeout /t 5 /nobreak >nul
start "" "http://127.0.0.1:8080/"
start "" "http://127.0.0.1:8081/"

echo  Если сайт пустой — подождите 10 сек и нажмите F5
echo  Лог: %LOG%
echo.
pause
