import { Controller, Get, Post, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Observable } from 'rxjs';
import { IAccountBalance, IAccount, IAccountTransactions } from './accounts.interface';

@Controller('accounts')
export class AccountsController {

  constructor(private readonly accountsService: AccountsService) {}

  @Get(':account/balance')
  async balance(@Param('account') account: string): Promise<IAccountBalance> {
    return this.accountsService.getBalance(account);
  }

  @Get(':account/transactions')
  async findTransactions(@Param('account') account: string): Promise<IAccountTransactions> {
    return this.accountsService.getTransactions(account);
  }

  // Security-wise, this functionality should actually be implemented client-side
  @Post()
  async create(): Promise<IAccount> {
    return this.accountsService.createAccount();
  }
}
