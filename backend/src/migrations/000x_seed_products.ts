// backend/src/migrations/000x_seed_products.ts
import { MigrationInterface, QueryRunner } from "typeorm";


export class SeedFillings000y implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO fillings (name, price, "isActive", options)
      VALUES
      ('Шоколад', 100, true, '{}'),
      ('Ваниль', 80, true, '{}'),
      ('Клубника', 120, true, '{}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM fillings WHERE name IN ('Шоколад', 'Ваниль', 'Клубника');
    `);
  }
}
export class SeedProducts000x implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (name, slug, "isActive", "basePrice", options)
      VALUES
      ('Торт шоколадный', 'chocolate-cake', true, 1200, '{}'),
      ('Торт ванильный', 'vanilla-cake', true, 1100, '{}'),
      ('Торт клубничный', 'strawberry-cake', true, 1150, '{}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM products
      WHERE slug IN ('chocolate-cake', 'vanilla-cake', 'strawberry-cake');
    `);
  }
}
