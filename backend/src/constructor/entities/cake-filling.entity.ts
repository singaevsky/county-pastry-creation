import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cake_fillings')
export class CakeFilling extends BaseEntity {
  @Column()
  type!: string;

  @Column('simple-array', { nullable: true })
  allergens?: string[];

  @Column('simple-array')
  availableForLayers!: string[];
}
