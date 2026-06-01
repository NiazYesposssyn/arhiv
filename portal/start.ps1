# Запуск сайта — только терминал (PowerShell)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  ЦГА ВКО — запуск..." -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "  Установите Node.js: https://nodejs.org/ (LTS)" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path node_modules)) {
  Write-Host "  npm install..."
  npm install
}

if (-not (Test-Path dist)) {
  Write-Host "  npm run build..."
  npm run build
}

$env:NODE_ENV = "production"
Write-Host ""
Write-Host "  Сайт: http://127.0.0.1:8080/  (или 8081 если 8080 занят)" -ForegroundColor Green
Write-Host "  Остановка: Ctrl+C" -ForegroundColor Yellow
Write-Host ""

node server/index.mjs
