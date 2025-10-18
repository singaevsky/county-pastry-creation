// backend/src/migrations/000x_add_indexes.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexes000x implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_user_id ON "orders" ("user_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_status ON "orders" ("status")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_products_slug ON "products" ("slug")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_orders_user_id`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_orders_status`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_products_slug`);
  }
}
