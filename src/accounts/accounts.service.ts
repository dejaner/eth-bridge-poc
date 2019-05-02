import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { IAccount, IAccountTransactions, IAccountTransaction, IAccountBalance } from './accounts.interface';
import { EthService } from '../eth/eth.service';

@Injectable()
export class AccountsService {

  constructor(private ethService: EthService) { }

  async getBalance(address: string): Promise<IAccountBalance> {
    const balance = await this.ethService.web3.eth.getBalance(address);
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
    const account = await this.ethService.web3.eth.accounts.create();
    return of({
      address: account.address,
      privateKey: account.privateKey,
    }).toPromise();
  }
}
