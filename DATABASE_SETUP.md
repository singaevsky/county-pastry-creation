# Настройка базы данных Supabase

## 📋 Этап 1: Система заказов и платежей (ТЕКУЩИЙ ЭТАП)

### Что будет создано:

#### 1. **settings** - Настройки системы
- `prepaid_percent`: процент предоплаты (по умолчанию 50%)
- Расширяемая система конфигурации

#### 2. **orders** - Заказы
- **Статус-машина**: `draft` → `awaiting_payment` → `paid` → `cooking` → `delivery` → `done`/`cancelled`
- Автоматический расчёт предоплаты (50%)
- Поля для доставки: адрес, координаты, стоимость
- Назначение кондитера: `assigned_cook_id`

#### 3. **payments** - Платежи
- Провайдеры: ЮKassa, Tinkoff (готово к расширению)
- Статусы: pending, completed, failed, refunded, partially_refunded
- Ссылки на оплату и чеки
- Метаданные в JSONB

#### 4. **audit_logs** - Аудит-лог
- Автоматическое логирование всех изменений заказов
- Хранение old_data и new_data в JSONB
- Отслеживание user_id, ip_address, user_agent

#### 5. **order_status_transitions** - История статусов
- Автоматическая запись при изменении статуса
- from_status → to_status
- Поле для заметок

### 🔐 Безопасность (RLS)

Все таблицы защищены Row Level Security:
- ✅ Пользователи видят только свои заказы
- ✅ Обновление только заказов в статусе `draft`
- ✅ Платежи видны только владельцам заказов
- ✅ Аудит-лог доступен для своих действий

### ⚙️ Автоматизация

#### Триггеры:
- **Аудит**: автоматически логирует INSERT/UPDATE/DELETE в orders
- **Статус-переходы**: записывает все изменения статуса
- **Предоплата**: автоматически рассчитывает prepaid_amount
- **Валидация**: запрещает некорректные переходы статусов

#### Разрешённые переходы статусов:
```
draft → любой статус
awaiting_payment → paid, cancelled
paid → cooking, cancelled
cooking → delivery, cancelled
delivery → done, cancelled
```

### 📊 Индексы производительности

Созданы индексы на:
- `orders`: user_id, status, assigned_cook_id
- `payments`: order_id, status
- `audit_logs`: (table_name, record_id), user_id
- `order_status_transitions`: order_id

---

## 🚀 Инструкция по установке

### Шаг 1: Запустите SQL миграцию

1. Откройте файл: **`database/orders_system.sql`**
2. Перейдите в Supabase Dashboard → SQL Editor
3. Скопируйте весь SQL код из файла
4. Нажмите **"Run"**

### Шаг 2: Проверьте результат

В разделе **Table Editor** должны появиться новые таблицы:
- ✅ settings
- ✅ orders  
- ✅ payments
- ✅ audit_logs
- ✅ order_status_transitions

---

## 📝 Существующие таблицы

### newsletter_subscribers
Подписчики на новости

### products
Каталог продуктов

### contact_submissions
Сообщения из контактной формы

### cart_items
Корзина покупок (для авторизованных пользователей)

### cake_configurations
Конфигурации тортов на заказ (связана с новой таблицей orders)

---

## 🔮 Следующие этапы

После завершения Этапа 1:

### Этап 2: Интеграция платежей
- Edge Function для ЮKassa
- Edge Function для Tinkoff
- Webhook обработчики
- Фискализация и чеки

### Этап 3: Геолокация
- PostGIS расширение
- Таблица cook_zones
- Автоназначение кондитера
- WebSocket обновления

### Этап 4: Доставка
- СДЭК API
- Яндекс.Доставка API
- Расчёт стоимости
- Telegram бот для кондитеров

---

## ⚠️ Важные замечания

- Все user_id колонки NOT NULL для безопасности
- Все timestamps в UTC
- Статус-переходы валидируются на уровне БД
- Аудит-лог работает автоматически
- Для админ-доступа потребуется создать таблицу user_roles (Этап 2)
