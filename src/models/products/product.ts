import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "../category/category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  name!: string;
  @Column()
  msrp!: number;
  @Column({
    nullable: true
  })
  discount!: number;
  @Column({
    default: 0
  })
  stock!: number;
  @Column({
    nullable: true
  })
  imageUrl?: string;
  @Column({
    default: 0
  })
  soldQuantity!: number;
  @Column({
    default: true
  })
  active!: boolean;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(_ => Category, category => category.products, { cascade: true })
  category!: Category;
}
