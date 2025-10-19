@echo off
echo 🚀 Быстрый запуск County Pastry Creation

REM Проверка Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден. Установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js найден

REM Установка зависимостей если нужно
if not exist "node_modules" (
    echo 📦 Установка зависимостей...
    npm install
)

if not exist "backend\node_modules" (
    echo 📦 Установка зависимостей backend...
    cd backend
    npm install
    cd ..
)

REM Создание .env файлов если нужно
if not exist "backend\.env" (
    echo ⚠️  Создаю файл backend\.env...
    echo DB_HOST=localhost > backend\.env
    echo DB_PORT=5432 >> backend\.env
    echo DB_USER=pastry_user >> backend\.env
    echo DB_PASS=pastry_password >> backend\.env
    echo DB_NAME=pastry_db >> backend\.env
    echo JWT_SECRET=your_jwt_secret_key_here >> backend\.env
    echo NODE_ENV=development >> backend\.env
    echo PORT=3001 >> backend\.env
)

if not exist ".env" (
    echo ⚠️  Создаю файл .env...
    echo VITE_API_URL=http://localhost:3001 > .env
    echo VITE_APP_TITLE=County Pastry Creation >> .env
)

echo 🚀 Запуск приложения...

REM Запуск backend
start "Backend Server" cmd /k "cd backend && npm run start:dev"

REM Ожидание
timeout /t 3 /nobreak >nul

REM Запуск frontend
start "Frontend Server" cmd /k "npm run dev"

echo ✅ Приложение запущено!
echo 📍 Frontend: http://localhost:5173
echo 📍 Backend: http://localhost: 
echo.
echo 🛑 Закройте окна для остановки
pause
