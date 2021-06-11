import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user";
import { CartItem } from './cart-item';

@Entity()
export class Cart {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.carts)
  user!: User;
  @OneToMany(() => CartItem, cItem => cItem.cart)
  items!: CartItem[];

  @UpdateDateColumn()
  updateAt!: Date;
  @CreateDateColumn()
  createdAt!: Date;
}