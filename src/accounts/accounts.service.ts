import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { IAccount, IAccountTransactions, IAccountTransaction, IAccountBalance } from './accounts.interface';

@Injectable()
export class AccountsService {

  getBalance(address: string): Observable<IAccountBalance> {
    return of({
      balance: '0.0',
    });
  }

  getTransactions(address: string): Observable<IAccountTransactions> {
    const incoming: IAccountTransaction[] = [
      {
        to: 'receiving_account',
        value: '0.0',
        data: 'receiving_data',
      },
    ];

    const outgoing: IAccountTransaction[] = [
      {
        to: 'receiving_account',
        value: '0.0',
        data: 'receiving_data',
      },
    ];

    return of({
      incoming,
      outgoing,
    });
  }

  createAccount(): Observable<IAccount> {
    return of({
      address: 'address',
      privateKey: 'pkey',
    });
  }
}
