import { Controller, Post, Body } from '@nestjs/common';
import { DTOCreateTransaction } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { ITransaction } from './transactions.interface';

@Controller('transactions')
export class TransactionsController {

  constructor(private transactionsService: TransactionsService) {}

  // TODO: validate input parameters
  @Post()
  async create(@Body() createTxData: DTOCreateTransaction): Promise<ITransaction> {
    return this.transactionsService.createTransaction(createTxData);
  }
}
