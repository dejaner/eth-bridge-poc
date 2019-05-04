import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { EthService } from '../eth/eth.service';
import { TransactionEntity } from './transaction.entity';

jest.mock('../eth/eth.service');

describe('TransactionsService', () => {
  let service: TransactionsService;
  const mockRepository = {
    save() { return; },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        EthService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useValue: mockRepository,
        }],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
