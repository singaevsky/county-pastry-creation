import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class UpdateCakeDesignTable1702908300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем новые колонки
    await queryRunner.addColumn(
      'cake_designs',
      new TableColumn({
        name: 'size_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Добавляем внешний ключ для size_id
    await queryRunner.createForeignKey(
      'cake_designs',
      new TableForeignKey({
        name: 'FK_CAKE_DESIGN_SIZE',
        columnNames: ['size_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cake_sizes',
        onDelete: 'SET NULL',
      }),
    );

    // Создаем промежуточные таблицы для связей many-to-many

    // Таблица для слоев
    await queryRunner.query(`
      CREATE TABLE cake_design_layers (
        design_id UUID REFERENCES cake_designs(id) ON DELETE CASCADE,
        layer_id UUID REFERENCES cake_layers(id) ON DELETE CASCADE,
        position INT NOT NULL,
        filling_id UUID REFERENCES cake_fillings(id) ON DELETE SET NULL,
        notes TEXT,
        PRIMARY KEY (design_id, layer_id, position)
      )
    `);

    // Таблица для украшений
    await queryRunner.query(`
      CREATE TABLE cake_design_decorations (
        design_id UUID REFERENCES cake_designs(id) ON DELETE CASCADE,
        decoration_id UUID REFERENCES cake_decorations(id) ON DELETE CASCADE,
        quantity INT NOT NULL DEFAULT 1,
        placement VARCHAR NOT NULL DEFAULT 'top',
        notes TEXT,
        PRIMARY KEY (design_id, decoration_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем промежуточные таблицы
    await queryRunner.query('DROP TABLE cake_design_decorations');
    await queryRunner.query('DROP TABLE cake_design_layers');

    // Удаляем внешний ключ
    await queryRunner.dropForeignKey('cake_designs', 'FK_CAKE_DESIGN_SIZE');

    // Удаляем колонки
    await queryRunner.dropColumn('cake_designs', 'size_id');
  }
}
