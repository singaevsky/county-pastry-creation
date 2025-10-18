import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFillingsTable1729000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "fillings" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "cost" DECIMAL NOT NULL
      );
    `);
    // Начальные данные
    await queryRunner.query(`
      INSERT INTO "fillings" (name, cost) VALUES
      ('cream', 100),
      ('chocolate', 120),
      ('fruit', 150),
      ('nut', 130),
      ('caramel', 110);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "fillings";`);
  }
}
