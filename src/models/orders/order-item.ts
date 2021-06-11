import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CartItem } from "../cart/cart-item";
import { Product } from "../products/product";
import { Order } from "./order";

@Entity()
export class OrderItem {
  @ManyToOne(_ => Product, { primary: true })
  product!: Product;
  @ManyToOne(_ => Order, order => order.details, { primary: true })
  order!: Order;

  @Column()
  price!: number;
  @Column()
  discount!: number;
  @Column()
  quantity!: number;


  static fromCartItem = (cartItem: CartItem, order: Order): OrderItem => {
    return {
      ...cartItem,
      order
    }
  }
}