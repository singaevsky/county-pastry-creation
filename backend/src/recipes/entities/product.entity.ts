import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, unique: true })
  slug!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('text', { array: true, nullable: true })
  images: string[] = [];

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'json', nullable: true })
  specifications: {
    weight?: number;
    size?: string;
    ingredients?: string[];
  } = {};

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
