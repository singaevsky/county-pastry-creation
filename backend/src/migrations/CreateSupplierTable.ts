import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSupplierTable1729000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "suppliers" (
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
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "suppliers";`);
  }
}
