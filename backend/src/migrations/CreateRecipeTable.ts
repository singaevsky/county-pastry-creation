import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecipeTable1729000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "recipes" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "ingredients" JSONB NOT NULL,
        "basePrice" DECIMAL NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipes";`);
  }
}
