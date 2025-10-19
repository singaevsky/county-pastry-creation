-- Настройка базы данных для County Pastry Creation
-- Выполните эти команды в PostgreSQL

-- Создание базы данных
CREATE DATABASE pastry_db;

-- Создание пользователя
CREATE USER pastry_user WITH PASSWORD 'pastry_password';

-- Предоставление прав
GRANT ALL PRIVILEGES ON DATABASE pastry_db TO pastry_user;

-- Подключение к базе данных
\c pastry_db;

-- Включение расширения UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'manager', 'baker')),
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "workload" INTEGER DEFAULT 0,
    "isEmailVerified" BOOLEAN DEFAULT false,
    "geoLat" DOUBLE PRECISION,
    "geoLong" DOUBLE PRECISION,
    "address" JSONB,
    "resetPasswordToken" VARCHAR,
    "resetPasswordExpires" TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы заказов
CREATE TABLE IF NOT EXISTS "orders" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "client_id" UUID NOT NULL,
    "baker_id" UUID,
    "status" VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'ready', 'completed', 'cancelled')),
    "paymentStatus" VARCHAR DEFAULT 'pending' CHECK ("paymentStatus" IN ('pending', 'paid', 'failed', 'refunded')),
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "items" JSONB NOT NULL,
    "deliveryDetails" JSONB NOT NULL,
    "specialRequirements" TEXT,
    "designImage" JSONB,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP,
    "cancelled_at" TIMESTAMP,
    FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("baker_id") REFERENCES "users"("id") ON DELETE SET NULL
);

-- Создание таблицы рецептов
CREATE TABLE IF NOT EXISTS "recipes" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" JSONB NOT NULL,
    "instructions" TEXT NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "difficulty" VARCHAR NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    "category" VARCHAR NOT NULL,
    "imageUrl" VARCHAR,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы поставщиков
CREATE TABLE IF NOT EXISTS "suppliers" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "contactPerson" VARCHAR,
    "email" VARCHAR,
    "phone" VARCHAR,
    "address" JSONB,
    "costCoefficient" DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы конструкторов
CREATE TABLE IF NOT EXISTS "constructors" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "productType" VARCHAR NOT NULL,
    "options" JSONB DEFAULT '{}',
    "designImages" JSONB DEFAULT '[]',
    "price" DECIMAL(10,2) DEFAULT 0,
    "status" VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'saved', 'ordered')),
    "metadata" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Создание таблицы размеров тортов
CREATE TABLE IF NOT EXISTS "cake_sizes" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "image_url" VARCHAR,
    "diameter" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "weight" FLOAT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы слоев тортов
CREATE TABLE IF NOT EXISTS "cake_layers" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "image_url" VARCHAR,
    "type" VARCHAR NOT NULL,
    "allergens" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы начинок
CREATE TABLE IF NOT EXISTS "cake_fillings" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "image_url" VARCHAR,
    "type" VARCHAR NOT NULL,
    "allergens" TEXT,
    "available_for_layers" TEXT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы украшений
CREATE TABLE IF NOT EXISTS "cake_decorations" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "image_url" VARCHAR,
    "type" VARCHAR NOT NULL,
    "placement" VARCHAR DEFAULT 'top',
    "allergens" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы дизайнов тортов
CREATE TABLE IF NOT EXISTS "cake_designs" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "size_id" UUID,
    "price" DECIMAL(10,2) NOT NULL,
    "user_id" UUID NOT NULL,
    "customization" JSONB,
    "specialInstructions" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("size_id") REFERENCES "cake_sizes"("id") ON DELETE SET NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Создание таблицы связей дизайн-слои
CREATE TABLE IF NOT EXISTS "cake_design_layers" (
    "design_id" UUID NOT NULL,
    "layer_id" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "filling_id" UUID,
    "notes" TEXT,
    PRIMARY KEY ("design_id", "layer_id"),
    FOREIGN KEY ("design_id") REFERENCES "cake_designs"("id") ON DELETE CASCADE,
    FOREIGN KEY ("layer_id") REFERENCES "cake_layers"("id") ON DELETE CASCADE,
    FOREIGN KEY ("filling_id") REFERENCES "cake_fillings"("id") ON DELETE SET NULL
);

-- Создание таблицы связей дизайн-украшения
CREATE TABLE IF NOT EXISTS "cake_design_decorations" (
    "design_id" UUID NOT NULL,
    "decoration_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "placement" VARCHAR NOT NULL,
    "notes" TEXT,
    PRIMARY KEY ("design_id", "decoration_id"),
    FOREIGN KEY ("design_id") REFERENCES "cake_designs"("id") ON DELETE CASCADE,
    FOREIGN KEY ("decoration_id") REFERENCES "cake_decorations"("id") ON DELETE CASCADE
);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS "IDX_USERS_EMAIL" ON "users"("email");
CREATE INDEX IF NOT EXISTS "IDX_USERS_ROLE" ON "users"("role");
CREATE INDEX IF NOT EXISTS "IDX_ORDERS_CLIENT_ID" ON "orders"("client_id");
CREATE INDEX IF NOT EXISTS "IDX_ORDERS_STATUS" ON "orders"("status");
CREATE INDEX IF NOT EXISTS "IDX_CAKE_SIZES_IS_ACTIVE" ON "cake_sizes"("is_active");
CREATE INDEX IF NOT EXISTS "IDX_CAKE_LAYERS_IS_ACTIVE" ON "cake_layers"("is_active");
CREATE INDEX IF NOT EXISTS "IDX_CAKE_FILLINGS_IS_ACTIVE" ON "cake_fillings"("is_active");
CREATE INDEX IF NOT EXISTS "IDX_CAKE_DECORATIONS_IS_ACTIVE" ON "cake_decorations"("is_active");
CREATE INDEX IF NOT EXISTS "IDX_CAKE_DESIGNS_USER_ID" ON "cake_designs"("user_id");
CREATE INDEX IF NOT EXISTS "IDX_CAKE_DESIGNS_SIZE_ID" ON "cake_designs"("size_id");

-- Вставка тестовых данных
INSERT INTO "users" ("email", "password", "firstName", "lastName", "role") VALUES
('admin@pastry.com', '$2b$10$example_hash', 'Admin', 'User', 'admin'),
('baker@pastry.com', '$2b$10$example_hash', 'Baker', 'User', 'baker'),
('client@pastry.com', '$2b$10$example_hash', 'Client', 'User', 'user');

INSERT INTO "cake_sizes" ("name", "description", "price", "diameter", "servings", "weight") VALUES
('Маленький', 'Торт на 4-6 порций', 1500.00, 18, 6, 0.8),
('Средний', 'Торт на 8-10 порций', 2500.00, 24, 10, 1.5),
('Большой', 'Торт на 12-15 порций', 3500.00, 30, 15, 2.2);

INSERT INTO "cake_layers" ("name", "description", "price", "type", "allergens") VALUES
('Ванильный бисквит', 'Классический ванильный бисквит', 200.00, 'sponge', 'яйца, пшеница'),
('Шоколадный бисквит', 'Насыщенный шоколадный бисквит', 250.00, 'sponge', 'яйца, пшеница, молоко'),
('Морковный бисквит', 'Полезный морковный бисквит', 300.00, 'sponge', 'яйца, пшеница, орехи');

INSERT INTO "cake_fillings" ("name", "description", "price", "type", "allergens", "available_for_layers") VALUES
('Крем-чиз', 'Классический крем-чиз', 150.00, 'cream', 'молоко', 'sponge'),
('Шоколадный ганаш', 'Насыщенный шоколадный ганаш', 200.00, 'ganache', 'молоко', 'sponge'),
('Фруктовое желе', 'Свежее фруктовое желе', 100.00, 'jelly', '', 'sponge');

INSERT INTO "cake_decorations" ("name", "description", "price", "type", "placement", "allergens") VALUES
('Свежие ягоды', 'Свежие сезонные ягоды', 300.00, 'fresh_fruits', 'top', ''),
('Шоколадная стружка', 'Домашняя шоколадная стружка', 150.00, 'chocolate', 'top', 'молоко'),
('Цветочная композиция', 'Съедобные цветы', 500.00, 'flowers', 'top', '');

-- Сообщение об успешном завершении
SELECT 'База данных успешно настроена!' as message;
