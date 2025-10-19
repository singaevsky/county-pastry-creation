import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1729000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "client_id" UUID NOT NULL,
        "baker_id" UUID,
        "status" VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'ready', 'completed', 'cancelled')),
        "paymentStatus" VARCHAR DEFAULT 'pending' CHECK ("paymentStatus" IN ('pending', 'paid', 'failed', 'refunded')),
        "totalAmount" DECIMAL(10,2) NOT NULL,
        "items" JSONB NOT NULL,
        "deliveryDetails" JSONB NOT NULL,
        "specialRequirements" TEXT,
        "designImage" JSONB,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "completed_at" TIMESTAMP,
        "cancelled_at" TIMESTAMP,
        FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE,
        FOREIGN KEY ("baker_id") REFERENCES "users"("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders";`);
  }
}
