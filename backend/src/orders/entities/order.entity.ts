import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderStatus, PaymentStatus, DeliveryDetails } from '../interfaces/order.interface';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client!: User;

  @Column({ type: 'uuid', name: 'client_id' })
  clientId!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'baker_id' })
  baker?: User;

  @Column({ type: 'uuid', name: 'baker_id', nullable: true })
  bakerId?: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus!: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number;

  @Column({ type: 'jsonb' })
  items!: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    customization?: Record<string, any>;
  }>;

  @Column({ type: 'jsonb' })
  deliveryDetails!: DeliveryDetails;

  @Column({ type: 'text', nullable: true })
  specialRequirements?: string;

  @Column({ type: 'jsonb', nullable: true })
  designImage?: {
    url: string;
    thumbnailUrl: string;
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'completed_at' })
  completedAt?: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'cancelled_at' })
  cancelledAt?: Date;
}
