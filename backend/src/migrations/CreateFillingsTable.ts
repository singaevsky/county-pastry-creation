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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "fillings";`);
  }
}
