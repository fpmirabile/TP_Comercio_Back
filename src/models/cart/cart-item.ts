import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../products/product";
import { Cart } from "./cart";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cart, cart => cart.items)
  cart!: Cart;
  @ManyToOne(() => Product)
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