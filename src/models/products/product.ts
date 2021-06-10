import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { OrderDetail } from "../orders/order-detail";
import { Category } from "./category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
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

  @ManyToOne(_ => OrderDetail, details => details.products)
  orderDetail!: OrderDetail
}
