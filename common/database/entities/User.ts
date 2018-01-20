import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 254 })
  email: string;

  @Column("varchar", { length: 64 })
  password_seed: string;

  @Column("varchar", { length: 128 })
  password_hash: string;

  @Column("boolean")
  disabled: boolean;

  @Column("boolean")
  frozen: boolean;

  @Column("boolean")
  delisted: boolean;
}
