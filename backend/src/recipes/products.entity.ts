import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  /**
   * Идентификатор варианта изделия
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Тип изделия
   */
  @Column({ type: 'enum', enum: ['torte', 'bento_torte', 'pie_berry', 'pie_meat', 'pie_lenten', 'roulette', 'pastry', 'cupcake', 'other'] })
  type: string;

  /**
   * Максимальное количество ярусов
   */
  @Column()
  maxTiers: number;

  /**
   * Максимальное количество начинок
   */
  @Column()
  maxFillings: number;

  // Расширяемо: добавить поля для новых правил (e.g., allowedColors)
}
