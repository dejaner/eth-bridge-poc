import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { DTOCreateTransaction } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { TransactionEntity } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {

  constructor(private transactionsService: TransactionsService) {}

  // TODO: validate input parameters
  @Post()
  create(@Body() createTxData: DTOCreateTransaction): Promise<TransactionEntity> {
    return this.transactionsService.createTransaction(createTxData).catch(error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, 400);
    });
  }
}
