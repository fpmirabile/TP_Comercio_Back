import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AddressFields } from "./address";

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
  @Column()
  creditCardType!: string;
  @Column()
  creditCardNumber!: number;
  @Column({
    length: 5
  })
  creditCardExpiration!: string;

  @Column(_ => AddressFields)
  address!: AddressFields;
}

