#!/bin/bash

# Скрипт для запуска проекта в режиме разработки
# Использование: ./start-dev.sh

echo "🚀 Запуск County Pastry Creation в режиме разработки..."

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Пожалуйста, установите Node.js версии 18 или выше."
    exit 1
fi

# Проверка версии Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Требуется Node.js версии 18 или выше. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js версия: $(node -v)"

# Установка зависимостей для backend
echo "📦 Установка зависимостей для backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Ошибка установки зависимостей backend"
        exit 1
    fi
fi
cd ..

# Установка зависимостей для frontend
echo "📦 Установка зависимостей для frontend..."
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Ошибка установки зависимостей frontend"
        exit 1
    fi
fi

# Проверка наличия .env файлов
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Файл backend/.env не найден. Создаю пример..."
    cat > backend/.env << EOF
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
EOF
    echo "✅ Создан файл backend/.env с настройками по умолчанию"
fi

if [ ! -f ".env" ]; then
    echo "⚠️  Файл .env не найден. Создаю пример..."
    cat > .env << EOF
# API Configuration
VITE_API_URL=http://localhost:3001

# Application Configuration
VITE_APP_TITLE=County Pastry Creation
EOF
    echo "✅ Создан файл .env с настройками по умолчанию"
fi

# Проверка PostgreSQL
echo "🗄️  Проверка подключения к PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL не найден. Убедитесь, что PostgreSQL установлен и запущен."
    echo "   Или используйте Docker: docker-compose up -d"
else
    # Попытка подключения к базе данных
    PGPASSWORD=pastry_password psql -h localhost -U pastry_user -d pastry_db -c "SELECT 1;" &> /dev/null
    if [ $? -ne 0 ]; then
        echo "⚠️  Не удается подключиться к базе данных. Убедитесь, что:"
        echo "   1. PostgreSQL запущен"
        echo "   2. База данных 'pastry_db' создана"
        echo "   3. Пользователь 'pastry_user' существует"
        echo "   4. Пароль 'pastry_password' установлен"
    else
        echo "✅ Подключение к базе данных успешно"
    fi
fi

# Запуск backend в фоновом режиме
echo "🔧 Запуск backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Ожидание запуска backend
echo "⏳ Ожидание запуска backend..."
sleep 5

# Проверка, что backend запустился
if ! curl -s http://localhost:3001 > /dev/null; then
    echo "⚠️  Backend не отвечает на порту 3001"
fi

# Запуск frontend
echo "🎨 Запуск frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Приложение запущено!"
echo ""
echo "📍 Адреса:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo ""
echo "🛑 Для остановки нажмите Ctrl+C"
echo ""

# Функция для корректного завершения
cleanup() {
    echo ""
    echo "🛑 Остановка приложения..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Приложение остановлено"
    exit 0
}

# Обработка сигналов для корректного завершения
trap cleanup SIGINT SIGTERM

# Ожидание завершения
wait
