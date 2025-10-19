import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserTable1702909200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем новые колонки
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'address',
        type: 'json',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_email_verified',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'reset_password_token',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'reset_password_expires',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_active',
        type: 'boolean',
        default: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем добавленные колонки
    await queryRunner.dropColumns('users', [
      'first_name',
      'last_name',
      'phone',
      'address',
      'is_email_verified',
      'reset_password_token',
      'reset_password_expires',
      'is_active',
    ]);
  }
}
