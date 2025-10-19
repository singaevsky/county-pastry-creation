# Руководство по запуску проекта локально

## Структура проекта

```
county-pastry-creation/
├── backend/                 # NestJS Backend
├── frontend/               # React Frontend (в корне)
├── database/              # SQL скрипты
└── docker-compose.yml     # Docker конфигурация
```

## Предварительные требования

- **Node.js** (версия 18 или выше)
- **npm** или **yarn**
- **PostgreSQL** (версия 13 или выше)
- **Redis** (опционально, для кэширования)

## Шаг 1: Установка зависимостей

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
# Frontend находится в корневой папке
npm install
```

## Шаг 2: Настройка базы данных

### Вариант A: Использование Docker (рекомендуется)
```bash
# Запуск PostgreSQL и Redis через Docker
docker-compose up -d
```

### Вариант B: Локальная установка PostgreSQL
1. Установите PostgreSQL
2. Создайте базу данных:
```sql
CREATE DATABASE pastry_db;
CREATE USER pastry_user WITH PASSWORD 'pastry_password';
GRANT ALL PRIVILEGES ON DATABASE pastry_db TO pastry_user;
```

## Шаг 3: Настройка переменных окружения

### Backend (.env в папке backend/)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=pastry_user
DB_PASS=pastry_password
DB_NAME=pastry_db

# Redis Configuration (опционально)
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
```

### Frontend (.env в корневой папке)
```env
# Supabase Configuration (если используется)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_URL=http://localhost:3001

# Application Configuration
VITE_APP_TITLE=County Pastry Creation
```

## Шаг 4: Запуск миграций базы данных

```bash
cd backend

# Сборка проекта
npm run build

# Запуск миграций (если есть CLI команда)
# npm run migration:run

# Или запуск через TypeORM CLI
npx typeorm migration:run -d ormconfig.ts
```

## Шаг 5: Запуск приложения

### Терминал 1: Backend
```bash
cd backend
npm run start:dev
```
Backend будет доступен на: http://localhost:3001

### Терминал 2: Frontend
```bash
# В корневой папке проекта
npm run dev
```
Frontend будет доступен на: http://localhost:5173

## Шаг 6: Проверка работы

1. **Backend API**: http://localhost:3001
   - Проверьте доступность API
   - Swagger документация (если настроена): http://localhost:3001/api

2. **Frontend**: http://localhost:5173
   - Откройте в браузере
   - Проверьте загрузку страниц
   - Протестируйте каталог с 5 карточками

## Возможные проблемы и решения

### Проблема: Ошибка подключения к базе данных
**Решение:**
```bash
# Проверьте, что PostgreSQL запущен
sudo service postgresql status

# Или через Docker
docker ps | grep postgres
```

### Проблема: Порт уже занят
**Решение:**
```bash
# Найдите процесс, использующий порт
lsof -i :3001
lsof -i :5173

# Убейте процесс
kill -9 <PID>
```

### Проблема: Ошибки TypeORM
**Решение:**
```bash
cd backend
# Пересоздайте базу данных
npx typeorm schema:drop
npx typeorm schema:sync
```

### Проблема: Ошибки зависимостей
**Решение:**
```bash
# Очистите кэш и переустановите
rm -rf node_modules package-lock.json
npm install
```

## Полезные команды

### Backend
```bash
# Разработка
npm run start:dev

# Сборка
npm run build

# Продакшен
npm run start:prod

# Тесты
npm run test
```

### Frontend
```bash
# Разработка
npm run dev

# Сборка
npm run build

# Предварительный просмотр
npm run preview

# Линтинг
npm run lint
```

### База данных
```bash
# Создание миграции
npx typeorm migration:create -n MigrationName

# Запуск миграций
npx typeorm migration:run

# Откат миграций
npx typeorm migration:revert
```

## Структура API

После запуска backend будет доступен на http://localhost:3001:

- **GET** `/` - Главная страница API
- **GET** `/products` - Список продуктов
- **POST** `/auth/login` - Авторизация
- **POST** `/auth/register` - Регистрация
- **GET** `/orders` - Заказы
- **POST** `/orders` - Создание заказа

## Мониторинг

### Логи Backend
```bash
# Просмотр логов в реальном времени
tail -f backend/logs/app.log
```

### Логи Frontend
```bash
# Логи в консоли браузера (F12)
# Или в терминале где запущен npm run dev
```

## Остановка приложения

```bash
# Остановка backend (Ctrl+C в терминале)
# Остановка frontend (Ctrl+C в терминале)

# Остановка Docker контейнеров
docker-compose down
```

## Следующие шаги

1. **Тестирование**: Протестируйте все функции приложения
2. **Данные**: Добавьте тестовые данные в базу
3. **Настройка**: Настройте переменные окружения для продакшена
4. **Деплой**: Подготовьте приложение к развертыванию
