// backend/src/constructor/entities/constructor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('constructors')
export class ConstructorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  productType: string;

  @Column('jsonb', { default: {} })
  options: Record<string, any>;

  @Column('jsonb', { default: [] })
  designImages: string[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: 'draft' })
  status: 'draft' | 'pending_payment' | 'completed';

  @Column('jsonb', { default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
