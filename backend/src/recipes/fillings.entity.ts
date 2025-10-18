// backend/src/recipes/fillings.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fillings')
export class Filling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column('jsonb', { default: {} })
  options: Record<string, any>;
}
