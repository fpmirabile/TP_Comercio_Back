import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { Order } from "../orders/order";
import { Billing } from "./billing";
import { Cart } from "../cart/cart";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({
    primary: false,
    unique: true,
  })
  email!: string;
  @Column()
  password!: string;
  @Column({
    default: false
  })
  isAdmin!: boolean;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((_) => Order, (orders) => orders.user)
  orders!: Order[];
  @OneToOne((_) => Billing)
  billing!: Billing;
  
  @OneToMany(() => Cart, cart => cart.user)
  carts!: Cart[]
}
