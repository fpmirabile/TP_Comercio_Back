import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column((_) => AddressFields)
  address!: AddressFields;
}

export class AddressFields {
  @Column()
  apartment!: number;
  @Column()
  floor!: number;
  @Column({
    length: 100
  })
  address!: string;
  @Column({
    length: 25
  })
  state!: string;
  @Column({
    length: 30
  })
  city!: string;
}
