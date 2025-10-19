# PowerShell скрипт для запуска проекта в режиме разработки
# Использование: .\start-dev.ps1

Write-Host "🚀 Запуск County Pastry Creation в режиме разработки..." -ForegroundColor Green

# Проверка наличия Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js версия: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js не найден. Пожалуйста, установите Node.js версии 18 или выше." -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Проверка версии Node.js
$version = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($version -lt 18) {
    Write-Host "❌ Требуется Node.js версии 18 или выше. Текущая версия: $nodeVersion" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Установка зависимостей для backend
Write-Host "📦 Установка зависимостей для backend..." -ForegroundColor Yellow
Set-Location backend
if (-not (Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка установки зависимостей backend" -ForegroundColor Red
        Read-Host "Нажмите Enter для выхода"
        exit 1
    }
}
Set-Location ..

# Установка зависимостей для frontend
Write-Host "📦 Установка зависимостей для frontend..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка установки зависимостей frontend" -ForegroundColor Red
        Read-Host "Нажмите Enter для выхода"
        exit 1
    }
}

# Проверка наличия .env файлов
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  Файл backend\.env не найден. Создаю пример..." -ForegroundColor Yellow
    @"
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=pastry_user
DB_PASS=pastry_password
DB_NAME=pastry_db

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRES_IN=24h

# Throttling Configuration
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# TypeORM Configuration
TYPEORM_LOGGING=true

# Application Configuration
NODE_ENV=development
PORT=3001
"@ | Out-File -FilePath "backend\.env" -Encoding UTF8
    Write-Host "✅ Создан файл backend\.env с настройками по умолчанию" -ForegroundColor Green
}

if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Файл .env не найден. Создаю пример..." -ForegroundColor Yellow
    @"
# API Configuration
VITE_API_URL=http://localhost:3001

# Application Configuration
VITE_APP_TITLE=County Pastry Creation
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Создан файл .env с настройками по умолчанию" -ForegroundColor Green
}

# Проверка PostgreSQL
Write-Host "🗄️  Проверка подключения к PostgreSQL..." -ForegroundColor Yellow
try {
    $pgTest = Get-Process -Name "postgres" -ErrorAction SilentlyContinue
    if ($pgTest) {
        Write-Host "✅ PostgreSQL запущен" -ForegroundColor Green
    } else {
        Write-Host "⚠️  PostgreSQL не найден в процессах. Убедитесь, что PostgreSQL установлен и запущен." -ForegroundColor Yellow
        Write-Host "   Или используйте Docker: docker-compose up -d" -ForegroundColor Cyan
    }
} catch {
    Write-Host "⚠️  Не удается проверить статус PostgreSQL" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Готово к запуску!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Адреса после запуска:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Запуск приложения..." -ForegroundColor Green
Write-Host ""

# Функция для запуска процессов
function Start-DevProcess {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Command
    )
    
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = "cmd.exe"
    $processInfo.Arguments = "/c `"cd /d $Path && $Command`""
    $processInfo.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Normal
    $processInfo.CreateNoWindow = $false
    
    $process = [System.Diagnostics.Process]::Start($processInfo)
    return $process
}

# Запуск backend
Write-Host "🔧 Запуск backend..." -ForegroundColor Yellow
$backendProcess = Start-DevProcess -Name "Backend" -Path (Get-Location).Path + "\backend" -Command "npm run start:dev"

# Ожидание запуска backend
Write-Host "⏳ Ожидание запуска backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Проверка, что backend запустился
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 5 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend успешно запущен" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Backend не отвечает на порту 3001" -ForegroundColor Yellow
}

# Запуск frontend
Write-Host "🎨 Запуск frontend..." -ForegroundColor Yellow
$frontendProcess = Start-DevProcess -Name "Frontend" -Path (Get-Location).Path -Command "npm run dev"

Write-Host ""
Write-Host "✅ Приложение запущено в отдельных окнах!" -ForegroundColor Green
Write-Host ""
Write-Host "🛑 Для остановки закройте окна 'Backend' и 'Frontend'" -ForegroundColor Yellow
Write-Host ""

# Ожидание нажатия клавиши
Read-Host "Нажмите Enter для выхода"
