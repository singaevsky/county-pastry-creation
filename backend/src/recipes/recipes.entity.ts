import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('jsonb') // Ингредиенты как JSON для гибкости
  ingredients: { name: string; cost: number; supplierId: number }[];

  @Column()
  basePrice: number; // Базовая стоимость
}
