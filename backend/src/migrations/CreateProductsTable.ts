import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1729000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL PRIMARY KEY,
        "type" VARCHAR NOT NULL CHECK (type IN ('torte','bento_torte','pie_berry','pie_meat','pie_lenten','roulette','pastry','cupcake','other')),
        "maxTiers" INTEGER NOT NULL,
        "maxFillings" INTEGER NOT NULL
      );
    `);
    // Начальные данные
    await queryRunner.query(`
      INSERT INTO "products" (type, maxTiers, maxFillings) VALUES
      ('torte', 5, 5),
      ('bento_torte', 1, 3),
      ('pie_berry', 1, 2),
      ('pie_meat', 1, 2),
      ('pie_lenten', 1, 2),
      ('roulette', 1, 3),
      ('pastry', 1, 2),
      ('cupcake', 1, 2),
      ('other', 3, 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products";`);
  }
}
