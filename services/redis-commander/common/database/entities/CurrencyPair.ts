import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class CurrencyPair {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  key: string;

  @Column('varchar') currencyAKey: string;

  @Column('varchar') currencyAName: string;

  @Column('varchar') currencyATxFee: string;

  @Column('varchar') currencyAMinConf: string;

  @Column('varchar') currencyBKey: string;

  @Column('varchar') currencyBName: string;

  @Column('varchar') currencyBTxFee: string;

  @Column('varchar') currencyBMinConf: string;

  @Column('varchar') currencyA24HVolume: string;

  @Column('varchar') currencyB24HVolume: string;
}
