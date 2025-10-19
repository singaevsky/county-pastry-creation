@echo off
REM Скрипт для запуска проекта в режиме разработки на Windows
REM Использование: start-dev.bat

echo 🚀 Запуск County Pastry Creation в режиме разработки...

REM Проверка наличия Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден. Пожалуйста, установите Node.js версии 18 или выше.
    pause
    exit /b 1
)

echo ✅ Node.js версия:
node --version

REM Установка зависимостей для backend
echo 📦 Установка зависимостей для backend...
cd backend
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Ошибка установки зависимостей backend
        pause
        exit /b 1
    )
)
cd ..

REM Установка зависимостей для frontend
echo 📦 Установка зависимостей для frontend...
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Ошибка установки зависимостей frontend
        pause
        exit /b 1
    )
)

REM Проверка наличия .env файлов
if not exist "backend\.env" (
    echo ⚠️  Файл backend\.env не найден. Создаю пример...
    (
        echo # Database Configuration
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_USER=pastry_user
        echo DB_PASS=pastry_password
        echo DB_NAME=pastry_db
        echo.
        echo # Redis Configuration
        echo REDIS_URL=redis://localhost:6379
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
        echo JWT_EXPIRES_IN=24h
        echo.
        echo # Throttling Configuration
        echo THROTTLE_TTL=60
        echo THROTTLE_LIMIT=10
        echo.
        echo # TypeORM Configuration
        echo TYPEORM_LOGGING=true
        echo.
        echo # Application Configuration
        echo NODE_ENV=development
        echo PORT=3001
    ) > backend\.env
    echo ✅ Создан файл backend\.env с настройками по умолчанию
)

if not exist ".env" (
    echo ⚠️  Файл .env не найден. Создаю пример...
    (
        echo # API Configuration
        echo VITE_API_URL=http://localhost:3001
        echo.
        echo # Application Configuration
        echo VITE_APP_TITLE=County Pastry Creation
    ) > .env
    echo ✅ Создан файл .env с настройками по умолчанию
)

echo.
echo 🎉 Готово к запуску!
echo.
echo 📍 Адреса после запуска:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:3001
echo.
echo 🚀 Запуск приложения...
echo.

REM Запуск backend в новом окне
start "Backend" cmd /k "cd backend && npm run start:dev"

REM Ожидание запуска backend
timeout /t 5 /nobreak >nul

REM Запуск frontend в новом окне
start "Frontend" cmd /k "npm run dev"

echo ✅ Приложение запущено в отдельных окнах!
echo.
echo 🛑 Для остановки закройте окна "Backend" и "Frontend"
echo.
pause
