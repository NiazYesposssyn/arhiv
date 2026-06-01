@echo off
chcp 65001 >nul
echo.
echo  Проверка сервера на http://127.0.0.1:8080/api/health
echo.
powershell -NoProfile -Command "try { $r = Invoke-RestMethod 'http://127.0.0.1:8080/api/health'; $r | ConvertTo-Json } catch { Write-Host 'ОШИБКА: сервер не запущен или СТАРАЯ версия (нет /api/health). Запустите ОБНОВИТЬ.bat и npm start' -ForegroundColor Red; exit 1 }"
echo.
pause
