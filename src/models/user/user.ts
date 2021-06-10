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

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  @PrimaryColumn()
  email!: string;
  @Column()
  password!: string;
  @Column()
  isAdmin!: boolean;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((_) => Order, (orders) => orders.user)
  orders!: Order[];
  @OneToOne((_) => Billing)
  billing!: Billing;
}
