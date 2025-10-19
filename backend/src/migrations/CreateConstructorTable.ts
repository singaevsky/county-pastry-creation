import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConstructorTable1729000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "constructors" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" UUID NOT NULL,
        "name" VARCHAR NOT NULL,
        "productType" VARCHAR NOT NULL,
        "options" JSONB DEFAULT '{}',
        "designImages" JSONB DEFAULT '[]',
        "price" DECIMAL(10,2) DEFAULT 0,
        "status" VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'saved', 'ordered')),
        "metadata" JSONB DEFAULT '{}',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "constructors";`);
  }
}
