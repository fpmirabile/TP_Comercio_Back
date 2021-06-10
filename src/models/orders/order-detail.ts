import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product";
import { Order } from "./order";

@Entity()
export class OrderDetail {
    @OneToMany(_ => Product, prod => prod.orderDetail, { primary: true })
    products!: Product[];
    @ManyToOne(_ => Order, order => order.details, { primary: true })
    order!: Order;

    @Column()
    quantity!: number;
    // Total de los productos
    @Column()
    productTotal!: number;
    @Column()
    tax!: number;
    // Total con impuestos
    @Column()
    orderTotal!: number;
}