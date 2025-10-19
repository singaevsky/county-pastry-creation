import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cake_sizes')
export class CakeSize {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('int')
  diameter!: number;

  @Column('float')
  weight!: number;

  @Column('int')
  servings!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  basePrice!: number;

  @Column('boolean', { default: true })
  isActive!: boolean;
}

@Entity('cake_layers')
export class CakeLayer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: ['biscuit', 'meringue', 'shortcrust'] })
  type!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('simple-array', { nullable: true })
  allergens?: string[];

  @Column('boolean', { default: true })
  isActive!: boolean;
}

@Entity('cake_fillings')
export class CakeFilling {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: ['cream', 'jam', 'mousse', 'custard'] })
  type!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('simple-array', { nullable: true })
  allergens?: string[];

  @Column('boolean', { default: true })
  isActive!: boolean;
}

@Entity('cake_decorations')
export class CakeDecoration {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: ['topping', 'fruit', 'chocolate', 'fondant'] })
  type!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('simple-array', { nullable: true })
  allergens?: string[];

  @Column('boolean', { default: true })
  isActive!: boolean;
}
