# 🚀 Быстрый запуск County Pastry Creation

## Варианты запуска

### 1. Автоматический запуск (рекомендуется)

**Для Windows:**
```bash
# Двойной клик на файл или в командной строке:
quick-start.bat
```

**Для PowerShell:**
```powershell
.\start-dev.ps1
```

### 2. Ручной запуск

#### Шаг 1: Установка зависимостей
```bash
# Backend
cd backend
npm install

# Frontend (в корневой папке)
npm install
```

#### Шаг 2: Настройка базы данных

**Вариант A: PostgreSQL (локально)**
```bash
# Создайте базу данных
psql -U postgres
CREATE DATABASE pastry_db;
CREATE USER pastry_user WITH PASSWORD 'pastry_password';
GRANT ALL PRIVILEGES ON DATABASE pastry_db TO pastry_user;
\q

# Выполните SQL скрипт
psql -U pastry_user -d pastry_db -f database-setup.sql
```

**Вариант B: Docker (проще)**
```bash
# Запуск PostgreSQL через Docker
docker run --name pastry-postgres -e POSTGRES_DB=pastry_db -e POSTGRES_USER=pastry_user -e POSTGRES_PASSWORD=pastry_password -p 5432:5432 -d postgres:13

# Выполните SQL скрипт
psql -h localhost -U pastry_user -d pastry_db -f database-setup.sql
```

#### Шаг 3: Запуск приложения

**Терминал 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Терминал 2 - Frontend:**
```bash
npm run dev
```

## 📍 Адреса приложения

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 🔧 Настройка переменных окружения

### Backend (.env в папке backend/)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=pastry_user
DB_PASS=pastry_password
DB_NAME=pastry_db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=3001
```

### Frontend (.env в корневой папке)
```env
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=County Pastry Creation
```

## 🎯 Что вы увидите

1. **Главная страница** с героем и функциями
2. **Каталог продуктов** с новой структурой 5 карточек:
   - 1 основная карточка слева (голубые градиенты)
   - 4 дополнительные карточки справа (фиолетовые/голубые градиенты)
3. **Конструктор тортов** для создания кастомных заказов
4. **Корзина** для управления заказами
5. **Авторизация** для пользователей

## 🛠️ Возможные проблемы

### Проблема: "Port already in use"
**Решение:**
```bash
# Найдите процесс на порту
netstat -ano | findstr :3001
netstat -ano | findstr :5173

# Убейте процесс
taskkill /PID <номер_процесса> /F
```

### Проблема: "Database connection failed"
**Решение:**
1. Убедитесь, что PostgreSQL запущен
2. Проверьте настройки в backend/.env
3. Выполните database-setup.sql

### Проблема: "Module not found"
**Решение:**
```bash
# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install

# Для backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

## 📱 Тестирование функций

1. **Каталог**: Проверьте переключение между продуктами
2. **Корзина**: Добавьте товары в корзину
3. **Конструктор**: Создайте кастомный торт
4. **Авторизация**: Зарегистрируйтесь и войдите
5. **Адаптивность**: Проверьте на мобильных устройствах

## 🎨 Особенности дизайна

- **Адаптивный дизайн**: Автоматически переключается между десктопом и мобильным
- **Градиентные карточки**: Красивые переходы цветов
- **Анимации**: Плавные переходы и эффекты
- **Интерактивность**: Клики, наведения, избранное

## 🚀 Готово!

Ваше приложение County Pastry Creation запущено и готово к использованию!

**Следующие шаги:**
1. Протестируйте все функции
2. Добавьте свои продукты в базу данных
3. Настройте дизайн под ваши потребности
4. Подготовьте к продакшену
