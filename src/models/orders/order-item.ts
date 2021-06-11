import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../products/product";
import { Order } from "./order";

@Entity()
export class OrderItem {
  @OneToMany(_ => Product, prod => prod.orderDetail, { primary: true })
  products!: Product[];
  @ManyToOne(_ => Order, order => order.details, { primary: true })
  order!: Order;

  @Column()
  price!: number;
  @Column()
  discount!: number;
  @Column()
  quantity!: number;
  @Column()
  tax!: number;
  // Total con impuestos
  @Column()
  orderTotal!: number;
}