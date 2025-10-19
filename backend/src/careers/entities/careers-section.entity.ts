import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('careers_sections')
export class CareersSection {
  @PrimaryColumn({ default: 1 })
  id!: number;

  @Column()
  heroTitle!: string;

  @Column('text')
  heroDescription!: string;

  @Column()
  contactTitle!: string;

  @Column('text')
  contactDescription!: string;

  @Column()
  contactButtonText!: string;

  @Column()
  contactButtonLink!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
