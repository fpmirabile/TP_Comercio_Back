import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";


// ! Significa que la propiedad no esta en el constructor
// Como no estan definidas pueden ser undefined 
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}