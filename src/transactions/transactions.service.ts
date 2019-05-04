import { Injectable } from '@nestjs/common';
import { EthService } from '../eth/eth.service';
import { DTOCreateTransaction } from './dto/create-transaction.dto';
import { TransactionEntity } from './transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly txRepository: Repository<TransactionEntity>,
    private ethService: EthService

  ) {}

  async createTransaction(txData: DTOCreateTransaction): Promise<TransactionEntity> {
    const account = this.ethService.web3.eth.accounts.privateKeyToAccount('0x' + txData.privateKey).address;
    const nonce = await this.ethService.web3.eth.getTransactionCount(account);

    const unsignedTx = {
      to: txData.to,
      value: txData.value ? txData.value : '0',
      gas: 2000000,
      chainId: 5777,
      nonce,
    };

    const signedTx = await this.ethService.web3.eth.accounts.signTransaction(unsignedTx, txData.privateKey);

    const response = new Promise<TransactionEntity>(async resolve => {
      this.ethService.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('transactionHash', (hash) => {
          const tx = new TransactionEntity();
          tx.toAddr = unsignedTx.to;
          tx.fromAddr = account;
          tx.txHash = hash;
          tx.value = this.ethService.web3.utils.hexToNumberString(unsignedTx.value);
          this.txRepository.save(tx);

          resolve(tx);
        });
    });

    return response;
  }
}
