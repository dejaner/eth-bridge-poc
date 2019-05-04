import { TransactionEntity } from '../transactions/transaction.entity';

export interface IAccountBalance {
  balance: string;
}

export interface IAccount {
  address: string;
  privateKey: string;
}

export interface IAccountTransaction {
  to: string;
  value: string;
  data: string;
}

export interface IAccountTransactions {
  incoming: TransactionEntity[];
  outgoing: TransactionEntity[];
}
