import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1729000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL PRIMARY KEY,
        "type" VARCHAR NOT NULL CHECK (type IN ('torte', 'bento_torte', 'pie_berry', 'pie_meat', 'pie_lenten', 'roulette', 'pastry', 'cupcake', 'other')),
        "maxTiers" INTEGER NOT NULL,
        "maxFillings" INTEGER NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products";`);
  }
}
