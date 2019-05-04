import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { EthService } from './eth/eth.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transactions/transaction.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [AccountsController, TransactionsController],
  providers: [AccountsService, EthService, TransactionsService],
})
export class AppModule {}
