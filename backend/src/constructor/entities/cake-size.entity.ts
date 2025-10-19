import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cake_sizes')
export class CakeSize extends BaseEntity {
  @Column('int')
  diameter!: number;

  @Column('int')
  servings!: number;

  @Column('float')
  weight!: number;
}
