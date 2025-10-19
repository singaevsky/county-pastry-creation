import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('jsonb')
  ingredients!: Array<{
    name: string;
    amount: number;
    unit: string;
    cost?: number;
  }>;

  @Column('text')
  instructions!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice!: number;

  @Column()
  prepTime!: number; // в минутах

  @Column()
  cookTime!: number; // в минутах

  @Column()
  servings!: number;

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  })
  difficulty!: 'easy' | 'medium' | 'hard';

  @Column()
  category!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
