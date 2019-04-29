import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get(':account/balance')
  balance(@Param('account') account: string): object {
    return {
      data: `Account balance for ${account}`,
    };
  }

  @Get(':account/transactions')
  findTransactions(@Param('account') account: string): object {
    return {
      data: `Account transactions for ${account}`,
    };
  }

  @Post()
  create(): object {
    return {
      data: 'Account created.',
    };
  }
}
