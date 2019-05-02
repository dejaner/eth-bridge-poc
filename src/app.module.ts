import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { EthService } from './eth/eth.service';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [AccountsService, EthService],
})
export class AppModule {}
