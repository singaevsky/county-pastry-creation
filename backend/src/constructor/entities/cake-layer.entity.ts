import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cake_layers')
export class CakeLayer extends BaseEntity {
  @Column()
  type!: string;

  @Column('simple-array', { nullable: true })
  allergens?: string[];
}
