import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProducts000y implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (name, slug, base_price, is_active)
      VALUES
        ('Classic Cake', 'classic-cake', 1000, true),
        ('Chocolate Cake', 'chocolate-cake', 1200, true);
    `);

    await queryRunner.query(`
      INSERT INTO fillings (name, price, is_active)
      VALUES
        ('Chocolate', 200, true),
        ('Vanilla Cream', 150, true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM fillings;`);
    await queryRunner.query(`DELETE FROM products;`);
  }
}
