import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Order } from "../orders/order";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(_ => Order, order => order.transaction)
    order!: Order;

    @Column()
    paymentId!: string;
    @Column()
    paymentType!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}