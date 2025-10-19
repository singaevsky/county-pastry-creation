import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fillings')
export class Filling {
  /**
   * Идентификатор начинки
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Название начинки
   */
  @Column()
  name: string;

  /**
   * Стоимость начинки
   */
  @Column({ type: 'decimal' })
  cost: number;

  // Редактируемо admin/baker
}
