import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ProductType } from '../common/types';

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
  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

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
}
