import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['client', 'admin', 'manager', 'baker'] })
  role: string;

  @Column({ nullable: true })
  geoLat?: number; // Для кондитеров

  @Column({ nullable: true })
  geoLong?: number;

  @Column({ default: 0 })
  workload: number; // Загрузка кондитера
}
