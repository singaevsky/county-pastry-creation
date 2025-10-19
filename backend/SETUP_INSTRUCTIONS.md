# Инструкции по настройке проекта

## Исправленные проблемы

### 1. Миграции базы данных
- ✅ Исправлены типы ID с SERIAL на UUID во всех миграциях
- ✅ Добавлены недостающие поля в таблицы
- ✅ Созданы правильные связи между таблицами
- ✅ Добавлены индексы для оптимизации производительности

### 2. Сущности (Entities)
- ✅ Исправлены типы ID с number на string (UUID)
- ✅ Добавлены правильные связи между сущностями
- ✅ Созданы недостающие сущности (Recipe, ConstructorEntity)
- ✅ Добавлены временные метки (createdAt, updatedAt)

### 3. Модули и импорты
- ✅ Исправлены импорты в app.module.ts
- ✅ Создан модуль для поставщиков (SuppliersModule)
- ✅ Исправлен модуль рецептов
- ✅ Добавлены все сущности в соответствующие модули

### 4. Конфигурация
- ✅ Обновлен ormconfig.ts с правильными путями
- ✅ Добавлена поддержка SSL для продакшена
- ✅ Настроено логирование

## Новые миграции

1. **CreateUserTable1650000000000** - Создание таблицы пользователей с UUID
2. **CreateOrderTable** - Создание таблицы заказов с правильными связями
3. **CreateRecipeTable** - Создание таблицы рецептов
4. **CreateSupplierTable** - Создание таблицы поставщиков
5. **CreateConstructorTable** - Создание таблицы конструкторов
6. **CreateCakeDesignTables** - Создание таблиц дизайнов тортов и связей
7. **1702908100000-create-cake-components-tables** - Компоненты тортов

## Структура базы данных

### Основные таблицы:
- `users` - Пользователи системы
- `orders` - Заказы
- `recipes` - Рецепты
- `suppliers` - Поставщики
- `constructors` - Конструкторы тортов

### Таблицы компонентов тортов:
- `cake_sizes` - Размеры тортов
- `cake_layers` - Слои тортов
- `cake_fillings` - Начинки
- `cake_decorations` - Украшения
- `cake_designs` - Дизайны тортов

### Связующие таблицы:
- `cake_design_layers` - Связь дизайнов и слоев
- `cake_design_decorations` - Связь дизайнов и украшений

## Команды для запуска

```bash
# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Запуск миграций
npm run migration:run

# Запуск в режиме разработки
npm run start:dev

# Запуск в продакшене
npm run start:prod
```

## Переменные окружения

Создайте файл `.env` в папке `backend/` со следующими переменными:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASS=your_password
DB_NAME=pastry_db

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Throttling Configuration
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# TypeORM Configuration
TYPEORM_LOGGING=false

# Application Configuration
NODE_ENV=development
PORT=3000
```

## Следующие шаги

1. Настройте базу данных PostgreSQL
2. Настройте Redis (опционально)
3. Запустите миграции
4. Запустите приложение
5. Протестируйте API endpoints
