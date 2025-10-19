import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCakeDesignTables1729000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы cake_designs
    await queryRunner.query(`
      CREATE TABLE "cake_designs" (
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
    `);

    // Создание таблицы связей дизайн-слои
    await queryRunner.query(`
      CREATE TABLE "cake_design_layers" (
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
    `);

    // Создание таблицы связей дизайн-украшения
    await queryRunner.query(`
      CREATE TABLE "cake_design_decorations" (
        "design_id" UUID NOT NULL,
        "decoration_id" UUID NOT NULL,
        "quantity" INTEGER NOT NULL DEFAULT 1,
        "placement" VARCHAR NOT NULL,
        "notes" TEXT,
        PRIMARY KEY ("design_id", "decoration_id"),
        FOREIGN KEY ("design_id") REFERENCES "cake_designs"("id") ON DELETE CASCADE,
        FOREIGN KEY ("decoration_id") REFERENCES "cake_decorations"("id") ON DELETE CASCADE
      );
    `);

    // Создание индексов
    await queryRunner.query(`
      CREATE INDEX "IDX_CAKE_DESIGNS_USER_ID" ON "cake_designs"("user_id");
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_CAKE_DESIGNS_SIZE_ID" ON "cake_designs"("size_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cake_design_decorations";`);
    await queryRunner.query(`DROP TABLE "cake_design_layers";`);
    await queryRunner.query(`DROP TABLE "cake_designs";`);
  }
}
