import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: ['client', 'admin', 'manager', 'baker'], default: 'client' })
  role!: string;

  @Column({ nullable: true })
  geoLat?: number; // Для кондитеров

  @Column({ nullable: true })
  geoLong?: number;

  @Column({ default: 0 })
  workload!: number; // Загрузка кондитера

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'jsonb', nullable: true })
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
