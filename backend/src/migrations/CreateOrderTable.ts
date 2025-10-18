import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1729000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "params" JSONB NOT NULL,
        "amount" DECIMAL NOT NULL,
        "status" VARCHAR DEFAULT 'pending',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "users"("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders";`);
  }
}
