import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn() id: number;

  @Column('varchar', { length: 254 })
  email: string;

  @Column('varchar', { length: 64 })
  passwordSeed: string;

  @Column('varchar', { length: 128 })
  passwordHash: string;

  @Column('boolean') disabled: boolean;

  @Column('boolean') frozen: boolean;

  @Column('boolean') delisted: boolean;
}
