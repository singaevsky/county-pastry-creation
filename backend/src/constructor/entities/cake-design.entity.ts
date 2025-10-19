import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn
} from 'typeorm';
import { CakeSize } from './cake-size.entity';
import { CakeLayer } from './cake-layer.entity';
import { CakeFilling } from './cake-filling.entity';
import { CakeDecoration } from './cake-decoration.entity';

@Entity('cake_designs')
export class CakeDesign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'uuid', nullable: true })
  sizeId?: string;

  @ManyToOne(() => CakeSize)
  @JoinColumn({ name: 'size_id' })
  size?: CakeSize;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'uuid' })
  userId!: string;

  // Многие-ко-многим связь для слоев с дополнительной информацией
  @ManyToMany(() => CakeLayer)
  @JoinTable({
    name: 'cake_design_layers',
    joinColumn: {
      name: 'design_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'layer_id',
      referencedColumnName: 'id',
    },
  })
  layers!: CakeLayer[];

  // Многие-ко-многим связь для украшений с дополнительной информацией
  @ManyToMany(() => CakeDecoration)
  @JoinTable({
    name: 'cake_design_decorations',
    joinColumn: {
      name: 'design_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'decoration_id',
      referencedColumnName: 'id',
    },
  })
  decorations!: CakeDecoration[];

  @Column('jsonb', { nullable: true })
  customization?: {
    layers: Array<{
      position: number;
      fillingId?: string;
      notes?: string;
    }>;
    decorations: Array<{
      quantity: number;
      placement: string;
      notes?: string;
    }>;
  };

  @Column('text', { nullable: true })
  specialInstructions?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
