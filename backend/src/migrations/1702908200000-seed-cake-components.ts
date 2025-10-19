import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCakeComponents1702908200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Размеры тортов
    await queryRunner.query(`
      INSERT INTO cake_sizes (name, description, diameter, servings, weight, price)
      VALUES
        ('Маленький', 'Идеально подходит для небольшой компании до 6 человек', 16, 6, 1.2, 2500),
        ('Средний', 'Отличный выбор для семейного праздника', 20, 10, 2.0, 3500),
        ('Большой', 'Подходит для больших торжеств', 24, 15, 3.0, 4500),
        ('Премиум', 'Роскошный торт для особых случаев', 30, 25, 5.0, 6500)
    `);

    // Слои тортов
    await queryRunner.query(`
      INSERT INTO cake_layers (name, description, type, price, allergens)
      VALUES
        ('Ванильный бисквит', 'Классический воздушный бисквит с нежным ванильным ароматом', 'biscuit', 500, 'глютен,яйца,молоко'),
        ('Шоколадный бисквит', 'Насыщенный шоколадный бисквит из бельгийского какао', 'biscuit', 600, 'глютен,яйца,молоко'),
        ('Красный бархат', 'Знаменитый красный бисквит с легким шоколадным вкусом', 'biscuit', 700, 'глютен,яйца,молоко'),
        ('Безе', 'Хрустящий воздушный корж из швейцарской меренги', 'meringue', 800, 'яйца'),
        ('Песочный', 'Рассыпчатый корж из песочного теста', 'shortcrust', 600, 'глютен,яйца')
    `);

    // Начинки
    await queryRunner.query(`
      INSERT INTO cake_fillings (name, description, type, price, allergens, available_for_layers)
      VALUES
        ('Заварной крем', 'Нежный классический заварной крем', 'custard', 400, 'молоко,яйца', 'biscuit,shortcrust'),
        ('Сливочный крем', 'Воздушный крем из натуральных сливок', 'cream', 500, 'молоко', 'biscuit,meringue,shortcrust'),
        ('Шоколадный мусс', 'Легкий мусс из бельгийского шоколада', 'mousse', 600, 'молоко,яйца', 'biscuit,meringue'),
        ('Ягодный конфитюр', 'Домашний конфитюр из свежих ягод', 'jam', 450, NULL, 'biscuit,meringue,shortcrust'),
        ('Карамельный крем', 'Солёная карамель со сливками', 'cream', 550, 'молоко', 'biscuit,shortcrust')
    `);

    // Украшения
    await queryRunner.query(`
      INSERT INTO cake_decorations (name, description, type, placement, price, allergens)
      VALUES
        ('Свежие ягоды', 'Ассорти из свежих сезонных ягод', 'fruit', 'top', 800, NULL),
        ('Шоколадные фигурки', 'Изящные фигурки из бельгийского шоколада', 'chocolate', 'top', 600, 'молоко,соя'),
        ('Съедобные цветы', 'Изысканные цветы из мастики', 'fondant', 'both', 1000, 'глютен'),
        ('Карамельные украшения', 'Воздушные украшения из карамели', 'topping', 'top', 700, NULL),
        ('Шоколадная стружка', 'Элегантная стружка из тёмного шоколада', 'chocolate', 'side', 400, 'молоко,соя')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM cake_decorations');
    await queryRunner.query('DELETE FROM cake_fillings');
    await queryRunner.query('DELETE FROM cake_layers');
    await queryRunner.query('DELETE FROM cake_sizes');
  }
}
