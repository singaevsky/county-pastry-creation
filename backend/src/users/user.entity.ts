import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../common/types';

@Entity('users')
export class User {
  /**
   * Идентификатор пользователя
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Email пользователя (уникальный)
   */
  @Column({ unique: true })
  email: string;

  /**
   * Хэшированный пароль
   */
  @Column()
  password: string;

  /**
   * Роль пользователя
   * @enum {string} client, baker, sales_manager, logistics_manager, admin
   */
  @Column({ type: 'enum', enum: Role })
  role: Role;

  /**
   * Геокоординаты (широта) для кондитеров
   */
  @Column({ nullable: true })
  geoLat?: number;

  /**
   * Геокоординаты (долгота) для кондитеров
   */
  @Column({ nullable: true })
  geoLong?: number;

  /**
   * Загрузка кондитера (количество активных заказов)
   */
  @Column({ default: 0 })
  workload: number;
}
