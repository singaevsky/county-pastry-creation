import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCakeComponentsTables1702908100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы cake_sizes
    await queryRunner.createTable(
      new Table({
        name: 'cake_sizes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'diameter',
            type: 'int',
          },
          {
            name: 'servings',
            type: 'int',
          },
          {
            name: 'weight',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    // Создание таблицы cake_layers
    await queryRunner.createTable(
      new Table({
        name: 'cake_layers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'allergens',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    // Создание таблицы cake_fillings
    await queryRunner.createTable(
      new Table({
        name: 'cake_fillings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'allergens',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'available_for_layers',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    // Создание таблицы cake_decorations
    await queryRunner.createTable(
      new Table({
        name: 'cake_decorations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'placement',
            type: 'varchar',
            default: "'top'",
          },
          {
            name: 'allergens',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    // Создание индексов
    await queryRunner.createIndex(
      'cake_sizes',
      new TableIndex({
        name: 'IDX_CAKE_SIZES_IS_ACTIVE',
        columnNames: ['is_active'],
      }),
    );

    await queryRunner.createIndex(
      'cake_layers',
      new TableIndex({
        name: 'IDX_CAKE_LAYERS_IS_ACTIVE',
        columnNames: ['is_active'],
      }),
    );

    await queryRunner.createIndex(
      'cake_fillings',
      new TableIndex({
        name: 'IDX_CAKE_FILLINGS_IS_ACTIVE',
        columnNames: ['is_active'],
      }),
    );

    await queryRunner.createIndex(
      'cake_decorations',
      new TableIndex({
        name: 'IDX_CAKE_DECORATIONS_IS_ACTIVE',
        columnNames: ['is_active'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('cake_decorations', 'IDX_CAKE_DECORATIONS_IS_ACTIVE');
    await queryRunner.dropIndex('cake_fillings', 'IDX_CAKE_FILLINGS_IS_ACTIVE');
    await queryRunner.dropIndex('cake_layers', 'IDX_CAKE_LAYERS_IS_ACTIVE');
    await queryRunner.dropIndex('cake_sizes', 'IDX_CAKE_SIZES_IS_ACTIVE');

    await queryRunner.dropTable('cake_decorations');
    await queryRunner.dropTable('cake_fillings');
    await queryRunner.dropTable('cake_layers');
    await queryRunner.dropTable('cake_sizes');
  }
}
