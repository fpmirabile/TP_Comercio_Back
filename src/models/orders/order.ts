import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../user/user'
import { Transaction } from '../transaction/transaction'
import { OrderItem } from './order-item'

/* eslint-disable no-unused-vars */
export enum OrderStatus {
  SHIPPED, // Se envio (funciona como completado)
  FAILED, // Se rechazo el pago
  PAID, // Se pudo conseguir el pago
  CREATED, // Tarda en tener el pago, pero fue creada
  CANCEL, // Se cancelo
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status!: OrderStatus
  @Column({
    length: 200,
  })
  comments!: string

  @ManyToOne((_) => User, (user) => user.orders)
  user!: User
  @OneToMany((_) => OrderItem, (details) => details.order, { cascade: true })
  details!: OrderItem[]
  @OneToOne((_) => Transaction, (transaction) => transaction.order)
  transaction!: Transaction
  @CreateDateColumn()
  createdAt!: Date
  @UpdateDateColumn()
  updatedAt!: Date
}
