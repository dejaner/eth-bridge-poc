import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { of } from 'rxjs';

describe('Accounts Controller', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  describe('#balance()', () => {
    it('returns account balance', async done => {
      const result = {
        balance: '1.0',
      };

      jest.spyOn(service, 'getBalance').mockImplementation(() => of(result));

      controller.balance('account').subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });
});
