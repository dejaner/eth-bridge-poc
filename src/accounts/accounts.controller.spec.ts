import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { of } from 'rxjs';

jest.mock('./accounts.service');

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
    it('returns account balance', async () => {
      const result = {
        balance: '1.0',
      };

      jest.spyOn(service, 'getBalance').mockImplementation(() => of(result).toPromise());

      expect(await controller.balance('account')).toBe(result);
    });
  });
});
