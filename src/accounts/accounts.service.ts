import { Injectable } from '@nestjs/common';
import { IAccount, IAccountTransactions, IAccountTransaction, IAccountBalance } from './accounts.interface';
import { EthService } from '../eth/eth.service';

@Injectable()
export class AccountsService {

  constructor(private ethService: EthService) { }

  async getBalance(address: string): Promise<IAccountBalance> {
    const balance = await this.ethService.web3.eth.getBalance(address);
    return Promise.resolve({
      balance: balance.toString(),
    });
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

    return Promise.resolve({
      incoming,
      outgoing,
    });
  }

  async createAccount(): Promise<IAccount> {
    const account = await this.ethService.web3.eth.accounts.create();
    return Promise.resolve({
      address: account.address,
      privateKey: account.privateKey,
    });
  }
}
