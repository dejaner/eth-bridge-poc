import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class EthService {
  web3: Web3;

  constructor() {
    this.web3 = new Web3('ws://ethereum:8546');
  }
}
