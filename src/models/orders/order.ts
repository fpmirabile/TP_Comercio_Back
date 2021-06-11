import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";
import { Transaction } from '../transaction/transaction';
import { OrderItem } from "./order-item";

enum OrderStatus {
    SHIPPED, // Se envio (funciona como completado)
    FAILED, // Se rechazo el pago
    PAID, // Se pudo conseguir el pago
    CREATED, // Tarda en tener el pago, pero fue creada
    CANCEL // Se cancelo
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({
        default: OrderStatus.CREATED
    })
    status!: OrderStatus;
    @Column({
        length: 200
    })
    comments!: string;

    @ManyToOne(_ => User, user => user.orders)
    user!: User
    @OneToMany(_ => OrderItem, details => details.order)
    details!: OrderItem[];
    @OneToOne(() => Transaction, transaction => transaction.order)
    transaction: Transaction | undefined;
    @CreateDateColumn()
    orderDate!: Date;
}
