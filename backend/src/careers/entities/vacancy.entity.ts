import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('vacancies')
export class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  location!: string;

  @Column()
  type!: string;

  @Column()
  schedule!: string;

  @Column('text')
  description!: string;

  @Column('simple-array')
  requirements!: string[];

  @Column({ nullable: true })
  salary?: string;

  @Column({ nullable: true })
  experience?: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
