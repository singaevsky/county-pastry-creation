import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSupplierTable1729000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "suppliers" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "costCoefficient" DECIMAL NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "suppliers";`);
  }
}
