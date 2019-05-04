import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { DTOCreateTransaction } from './dto/create-transaction.dto';

jest.mock('./transactions.service');

describe('Transactions Controller', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('create()', async () => {
    const requestData: DTOCreateTransaction = {
      to: 'destAddress',
      value: '100',
      privateKey: 'pkey',
    };

    const result = {
      toAddr: 'toAddress',
      fromAddr: 'fromAddress',
      txHash: 'hash',
      value: '100',
      status: 'pending',
    };

    const spy = jest.spyOn(service, 'createTransaction').mockImplementation(() => Promise.resolve(result));

    expect(await controller.create(requestData)).toBe(result);
    expect(spy).toBeCalledWith(requestData);
  });
});
