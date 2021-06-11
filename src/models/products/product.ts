import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "./category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  name!: string;
  @Column()
  msrp!: number;
  @Column({
    default: 0
  })
  stock!: number;
  @Column()
  imageUrl!: string;
  @Column({
    default: 0
  })
  soldQuantity!: number;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(_ => Category, category => category.products, { cascade: true })
  category!: Category;
}
