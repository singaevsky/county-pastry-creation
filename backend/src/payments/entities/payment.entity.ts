import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  CANCELED = 'canceled',
  FAILED = 'failed'
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order!: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  currency!: string;

  @Column()
  paymentMethodId!: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @Column('jsonb', { nullable: true })
  metadata?: Record<string, any>;

  @Column({ nullable: true })
  externalId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
