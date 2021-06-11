import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { OrderItem } from "../orders/order-item";
import { Category } from "./category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  name!: string;
  @Column()
  msrp!: number;
  @Column()
  stock!: number;
  @Column()
  soldQuantity!: number;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(_ => Category, category => category.products)
  category!: Category;

  @ManyToOne(_ => OrderItem, details => details.products)
  orderDetail!: OrderItem
}
