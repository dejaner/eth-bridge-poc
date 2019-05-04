import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryColumn()
  txHash: string;

  @Column()
  fromAddr: string;

  @Column()
  toAddr: string;

  @Column()
  value: string;
}
