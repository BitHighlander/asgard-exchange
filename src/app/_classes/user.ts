

export type WalletType = 'keystore' | 'walletconnect' | 'ledger' | 'pioneer';
import { Client as BinanceClient } from '@xchainjs/xchain-binance';
import { Client as BitcoinClient } from '@xchainjs/xchain-bitcoin';
import { Client as ThorchainClient } from '@xchainjs/xchain-thorchain';
import { Client as EthereumClient } from '@xchainjs/xchain-ethereum/lib';
import { Balances } from '@xchainjs/xchain-client';

export interface AvailableClients {
  binance: BinanceClient;
  bitcoin: BitcoinClient;
  thorchain: ThorchainClient;
  ethereum: EthereumClient;
}

export class User {
  type: WalletType;
  wallet: string; // Address
  keystore?: any;
  clients?: AvailableClients;

  // for Ledger
  pioneer?: any;
  ledger?: any;
  hdPath?: number [];
  balances: Balances;
  // walletConnector?: FixmeType;

  // tslint:disable-next-line:max-line-length
  constructor(user: {type: WalletType, wallet: string, keystore?: any, ledger?: any, pioneer?: any, hdPath?: number[], clients?: AvailableClients}) {
    this.type = user.type;
    this.wallet = user.wallet;
    this.keystore = user.keystore ?? null;
    this.ledger = user.ledger ?? null;
    this.pioneer = user.pioneer ?? null;
    this.hdPath = user.hdPath ?? null;
    this.clients = user.clients;
  }

}
