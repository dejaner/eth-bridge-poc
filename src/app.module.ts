import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AppModule {}
