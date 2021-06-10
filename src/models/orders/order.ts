import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";
import { OrderDetail } from "./order-detail";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    status!: OrderStatus;
    @Column({
        length: 200
    })
    comments!: string;

    @ManyToOne(_ => User, user => user.orders)
    user!: User
    @OneToMany(_ => OrderDetail, details => details.order)
    details!: OrderDetail[];
    @CreateDateColumn()
    orderDate!: Date;
}

enum OrderStatus {
    SHIPPED,
    PAYED,
    CREATED,
    CANCEL
}