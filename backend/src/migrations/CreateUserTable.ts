import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1729000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR UNIQUE NOT NULL,
        "password" VARCHAR NOT NULL,
        "role" VARCHAR NOT NULL CHECK (role IN ('client','baker','sales_manager','logistics_manager','admin')),
        "geoLat" DOUBLE PRECISION,
        "geoLong" DOUBLE PRECISION,
        "workload" INTEGER DEFAULT 0,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
