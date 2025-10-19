import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cake_decorations')
export class CakeDecoration extends BaseEntity {
  @Column()
  type!: string;

  @Column({
    type: 'enum',
    enum: ['top', 'side', 'both'],
    default: 'top'
  })
  placement!: 'top' | 'side' | 'both';

  @Column('simple-array', { nullable: true })
  allergens?: string[];
}
