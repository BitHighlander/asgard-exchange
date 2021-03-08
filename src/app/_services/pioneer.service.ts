import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { decryptFromKeystore } from '@xchainjs/xchain-crypto';
import { User } from '../_classes/user';

import { SDK } from '@pioneer-platform/pioneer-sdk';

@Injectable({
  providedIn: 'root'
})
export class PioneerService {

  constructor() { }

  async unlockKeystore(queryKey: string): Promise<any> {
    const network = environment.network === 'testnet' ? 'testnet' : 'mainnet';

    // const config = {
    //   network,
    //   queryKey: '5bf044fe-6786-4c84-a06e-e4e2e0dbda48',
    //   username: 'test-user-554433',
    //   spec: 'http://127.0.0.1:9001/spec/swagger.json'
    // };
    //
    // const app: any = new SDK(config.spec, config);
    // await app.init();
    //
    // const userParams = await app.getUserParams();
    //
    // return new User(userParams);
  }

}
