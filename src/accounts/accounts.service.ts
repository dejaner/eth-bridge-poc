import { Injectable } from '@nestjs/common';
import { IAccount, IAccountTransactions, IAccountBalance } from './accounts.interface';
import { EthService } from '../eth/eth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly txRepository: Repository<TransactionEntity>,
    private ethService: EthService,
  ) { }

  async getBalance(address: string): Promise<IAccountBalance> {
    const balance = await this.ethService.web3.eth.getBalance(address);

    return Promise.resolve({
      balance: balance.toString(),
    });
  }

  async getTransactions(address: string): Promise<IAccountTransactions> {
    const incoming = await this.txRepository.find({ toAddr: address });
    const outgoing = await this.txRepository.find({ fromAddr: address });

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
