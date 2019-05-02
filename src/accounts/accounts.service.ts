import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { IAccount, IAccountTransactions, IAccountTransaction, IAccountBalance } from './accounts.interface';
import Web3 from 'web3';

@Injectable()
export class AccountsService {
  web3: Web3;

  constructor() {
    this.web3 = new Web3('http://localhost:8545');
  }

  async getBalance(address: string): Promise<IAccountBalance> {
    const balance = await this.web3.eth.getBalance(address);
    return of({
      balance: balance.toString(),
    }).toPromise();
  }

  async getTransactions(address: string): Promise<IAccountTransactions> {
    const incoming: IAccountTransaction[] = [
      {
        to: 'receiving_account',
        value: '0.0',
        data: 'receiving_data',
      },
    ];

    const outgoing: IAccountTransaction[] = [
      {
        to: 'receiving_account',
        value: '0.0',
        data: 'receiving_data',
      },
    ];

    return of({
      incoming,
      outgoing,
    }).toPromise();
  }

  async createAccount(): Promise<IAccount> {
    const account = await this.web3.eth.accounts.create();
    return of({
      address: account.address,
      privateKey: account.privateKey,
    }).toPromise();
  }
}
