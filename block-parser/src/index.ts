import 'reflect-metadata';
import {createConnection, getRepository} from 'typeorm';
import {TransactionEntity} from './entity/Transaction';
import Web3 from 'web3';

createConnection().then(async connection => {
    console.log('Starting block parser...');

    const web3 = new Web3('ws://ethereum:8546');
    const txRepository = getRepository(TransactionEntity);

    web3.eth.subscribe('newBlockHeaders')
      .on('data', async data => {
        console.log('New block: ', data.number);
        const txHashes = (await web3.eth.getBlock(data.number, true)).transactions;

        txHashes.forEach(async txHash => {
          const txReceipt = await web3.eth.getTransactionReceipt(txHash.hash);
          console.log('Processing transaction ', txReceipt.transactionHash);

          let tx: TransactionEntity;

          // Limit processing only to transactions created through our eth-bridge for now
          try {
            tx = await txRepository.findOneOrFail({ txHash: txReceipt.transactionHash });
          } catch (error) {
            console.log('Tx not found in DB, skipping.');
            return;
          }

          tx.status = txReceipt.status ? 'successful' : 'failed';
          await txRepository.save(tx);
        });
      });
}).catch(error => console.log(error));
