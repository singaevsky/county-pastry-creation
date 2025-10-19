import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
   * @enum {string} client - Пользователь, baker - Кондитер, sales_manager - Менеджер продаж, logistics_manager - Менеджер логистики, admin - Администратор сайта
   */
  @Column({ type: 'enum', enum: ['client', 'baker', 'sales_manager', 'logistics_manager', 'admin'] })
  role: string;

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
