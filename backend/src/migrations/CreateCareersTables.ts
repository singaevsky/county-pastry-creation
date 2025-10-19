import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCareersTables1729000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы вакансий
    await queryRunner.query(`
      CREATE TABLE "vacancies" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" VARCHAR NOT NULL,
        "location" VARCHAR NOT NULL,
        "type" VARCHAR NOT NULL,
        "schedule" VARCHAR NOT NULL,
        "description" TEXT NOT NULL,
        "requirements" TEXT[] NOT NULL,
        "salary" VARCHAR,
        "experience" VARCHAR,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Создание таблицы преимуществ
    await queryRunner.query(`
      CREATE TABLE "benefits" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" VARCHAR NOT NULL,
        "description" TEXT NOT NULL,
        "icon" VARCHAR NOT NULL,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Создание таблицы настроек раздела вакансий
    await queryRunner.query(`
      CREATE TABLE "careers_sections" (
        "id" INTEGER PRIMARY KEY DEFAULT 1,
        "heroTitle" VARCHAR NOT NULL,
        "heroDescription" TEXT NOT NULL,
        "contactTitle" VARCHAR NOT NULL,
        "contactDescription" TEXT NOT NULL,
        "contactButtonText" VARCHAR NOT NULL,
        "contactButtonLink" VARCHAR NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Вставка начальных данных
    await queryRunner.query(`
      INSERT INTO "careers_sections" (
        "heroTitle", 
        "heroDescription", 
        "contactTitle", 
        "contactDescription", 
        "contactButtonText", 
        "contactButtonLink"
      ) VALUES (
        'Вакансии',
        'Присоединяйтесь к команде профессионалов! Мы ищем талантливых людей, которые разделяют нашу любовь к кондитерскому искусству.',
        'Не нашли подходящую вакансию?',
        'Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящих вакансий!',
        'Связаться с нами',
        '/contact'
      );
    `);

    // Вставка примеров преимуществ
    await queryRunner.query(`
      INSERT INTO "benefits" ("title", "description", "icon", "isActive") VALUES
      ('Конкурентная зарплата', 'Мы предлагаем достойную оплату труда с возможностью роста', '💰', true),
      ('Обучение и развитие', 'Постоянное повышение квалификации и карьерный рост', '📚', true),
      ('Дружный коллектив', 'Работа в команде единомышленников', '👥', true);
    `);

    // Вставка примеров вакансий
    await queryRunner.query(`
      INSERT INTO "vacancies" (
        "title", 
        "location", 
        "type", 
        "schedule", 
        "description", 
        "requirements", 
        "salary", 
        "experience", 
        "isActive"
      ) VALUES (
        'Кондитер',
        'Москва, ул. Примерная, 1',
        'Полная занятость',
        '5/2, 9:00-18:00',
        'Ищем опытного кондитера для работы с тортами и десертами. Требуется опыт работы от 2 лет.',
        ARRAY['Опыт работы кондитером от 2 лет', 'Знание технологий приготовления тортов', 'Навыки работы с кремами и декором', 'Ответственность и аккуратность'],
        'от 50 000 ₽',
        'от 2 лет',
        true
      ),
      (
        'Помощник кондитера',
        'Москва, ул. Примерная, 1',
        'Полная занятость',
        '2/2, 8:00-20:00',
        'Приглашаем помощника кондитера в нашу дружную команду. Готовы обучить с нуля!',
        ARRAY['Желание учиться и развиваться', 'Аккуратность и внимательность', 'Ответственное отношение к работе', 'Опыт приветствуется, но не обязателен'],
        'от 35 000 ₽',
        'без опыта',
        true
      );
    `);

    // Создание индексов
    await queryRunner.query(`
      CREATE INDEX "IDX_VACANCIES_IS_ACTIVE" ON "vacancies"("isActive");
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_VACANCIES_CREATED_AT" ON "vacancies"("createdAt");
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_BENEFITS_IS_ACTIVE" ON "benefits"("isActive");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_BENEFITS_IS_ACTIVE"`);
    await queryRunner.query(`DROP INDEX "IDX_VACANCIES_CREATED_AT"`);
    await queryRunner.query(`DROP INDEX "IDX_VACANCIES_IS_ACTIVE"`);
    
    await queryRunner.query(`DROP TABLE "careers_sections"`);
    await queryRunner.query(`DROP TABLE "benefits"`);
    await queryRunner.query(`DROP TABLE "vacancies"`);
  }
}
