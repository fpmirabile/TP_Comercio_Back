import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;
    @OneToMany(_ => Product, product => product.category)
    products!: Product[];
}