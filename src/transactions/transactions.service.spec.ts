import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { EthService } from '../eth/eth.service';

jest.mock('../eth/eth.service');

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, EthService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
