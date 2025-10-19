import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('constructors')
export class ConstructorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  name!: string;

  @Column()
  productType!: string;

  @Column('jsonb', { default: {} })
  options!: Record<string, any>;

  @Column('jsonb', { default: [] })
  designImages!: string[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ 
    type: 'enum',
    enum: ['draft', 'saved', 'ordered'],
    default: 'draft'
  })
  status!: 'draft' | 'saved' | 'ordered';

  @Column('jsonb', { default: {} })
  metadata!: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
