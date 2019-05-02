import { Injectable } from '@nestjs/common';
import { EthService } from '../eth/eth.service';
import { ITransaction } from './transactions.interface';
import { DTOCreateTransaction } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {

  constructor(private ethService: EthService) {}

  async createTransaction(txData: DTOCreateTransaction): Promise<ITransaction> {
    const account = this.ethService.web3.eth.accounts.privateKeyToAccount('0x' + txData.privateKey).address;
    const nonce = await this.ethService.web3.eth.getTransactionCount(account);

    const unsignedTx = {
      to: txData.to,
      value: txData.value ? txData.value : 0,
      gas: 2000000,
      chainId: 5777,
      nonce,
    };

    const signedTx = await this.ethService.web3.eth.accounts.signTransaction(unsignedTx, txData.privateKey);

    const response = new Promise<ITransaction>(resolve => {
      this.ethService.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .once('transactionHash', (hash) => resolve({
          txHash: hash,
          status: 'pending',
        }));
    });

    return response;
  }
}
