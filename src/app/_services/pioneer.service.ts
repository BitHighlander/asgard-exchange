import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_classes/user';

import * as ls from 'local-storage';
import { SDK } from '@pioneer-platform/pioneer-sdk';
import { v4 as uuidv4 } from 'uuid';
import { sleep } from 'wait-promise';


@Injectable({
  providedIn: 'root'
})
export class PioneerService {
  private App: any;
  private Api: any;
  private Config: any;
  private PairAttempts: number;
  constructor() {
    console.log('init');
    let config: any = ls.get('config');
    if (!config){
      // TODO offer custom pioneer server
      config = {
        queryKey: 'key:' + uuidv4(),
        // TODO opt-in to fio usernames
        username: 'user:' + uuidv4(),
      };
      ls.set('config', config);
      this.Config = config;
    } else {
      if (!config.queryKey) { throw Error('Invalid ls config!'); }
      if (!config.username) { throw Error('Invalid ls config!'); }
      this.Config = config;
    }
  }

  getQueryKey(): string {
    return this.Config.queryKey;
  }

  async createPairingCode(): Promise<any> {
    const network = environment.network === 'testnet' ? 'testnet' : 'mainnet';
    if (!this.Config.queryKey) { throw Error('Failed to init! missing queryKey'); }
    if (!this.Config.username) { throw Error('Failed to init! missing username'); }

    const config = {
      network,
      queryKey: this.Config.queryKey,
      username: this.Config.username,
      spec: 'https://pioneers.dev/spec/swagger.json'
    };

    this.App = new SDK(config.spec, config);
    // api docs https://pioneers.dev/docs/
    const seedChains = ['Bitcoin', 'Ethereum', 'Thorchain'];
    this.Api = await this.App.init(seedChains);

    const pairingCode = await this.App.createPairingCode();
    if (!pairingCode.code) { throw Error('Failed to get pairing code!'); }

    return pairingCode.code;
  }

  async onPair(): Promise<any> {
    const network = environment.network === 'testnet' ? 'testnet' : 'mainnet';
    if (!this.Config.queryKey) { throw Error('Failed to init! missing queryKey'); }
    if (!this.Config.username) { throw Error('Failed to init! missing username'); }

    const config = {
      network,
      queryKey: this.Config.queryKey,
      username: this.Config.username,
      spec: 'https://pioneers.dev/spec/swagger.json'
    };

    const app: any = new SDK(config.spec, config);
    await app.init();

    const info = await app.getInfo();
    console.log('info: ', info);
    if (info){
      const userParams = await app.getUserParams();
      console.log('userParams: ', userParams);

      return new User(userParams);
    } else {
      console.log('no user data found!');
      // wait 3 seconds
      await sleep(3000);
      // try again
      this.PairAttempts = this.PairAttempts + 1;
      if (this.PairAttempts > 100){
        this.onPair();
      } else {
        console.error('Failed to pair! timeout');
      }
    }
  }
}
