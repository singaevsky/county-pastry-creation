import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecipeTable1729000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "recipes" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "description" TEXT NOT NULL,
        "ingredients" JSONB NOT NULL,
        "instructions" TEXT NOT NULL,
        "basePrice" DECIMAL(10,2) NOT NULL,
        "prepTime" INTEGER NOT NULL,
        "cookTime" INTEGER NOT NULL,
        "servings" INTEGER NOT NULL,
        "difficulty" VARCHAR NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
        "category" VARCHAR NOT NULL,
        "imageUrl" VARCHAR,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipes";`);
  }
}
