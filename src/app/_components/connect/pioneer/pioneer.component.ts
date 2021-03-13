import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { PioneerService } from 'src/app/_services/pioneer.service';

@Component({
  selector: 'app-pioneer',
  templateUrl: './pioneer.component.html',
  styleUrls: ['./pioneer.component.scss']
})
export class PioneerComponent implements OnInit {
  pairingCode: string;
  queryKey: string;
  keystore;
  loading: boolean;
  @Output() back: EventEmitter<null>;
  @Output() closeModal: EventEmitter<null>;

  constructor(private userService: UserService, private pioneerService: PioneerService) {
    this.queryKey = this.pioneerService.getQueryKey();
    this.back = new EventEmitter<null>();
    this.closeModal = new EventEmitter<null>();
  }

  async ngOnInit(): Promise<void> {
    console.log('Get Pairing Code');
    const pairingCode = await this.pioneerService.createPairingCode();
    this.loading = false;
    this.pairingCode = pairingCode;
    this.onPair();
  }

  async onPair(): Promise<void> {
    const user = await this.pioneerService.onPair();

    if (user){
      console.log('user: ', user);
      this.userService.setUser(user);
      // this.userService.fetchBalances();
      this.closeModal.next();
    }
  }

  clearKeystore() {
    this.back.emit();
  }
}
