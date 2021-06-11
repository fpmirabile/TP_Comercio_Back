import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../products/product";
import { Cart } from "./cart";

@Entity()
export class CartItem {
  @ManyToOne(() => Cart, cart => cart.items, { primary: true })
  cart!: Cart;
  @ManyToOne(() => Product, { primary: true })
  product!: Product;

  @Column()
  price!: number;
  @Column()
  discount!: number;
  @Column()
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}