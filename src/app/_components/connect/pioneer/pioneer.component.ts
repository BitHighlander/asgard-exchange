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
  keystore;
  loading: boolean;
  @Output() back: EventEmitter<null>;
  @Output() closeModal: EventEmitter<null>;

  constructor(private userService: UserService, private pioneerService: PioneerService) {
    this.back = new EventEmitter<null>();
    this.closeModal = new EventEmitter<null>();
  }

  ngOnInit(): void {
    console.log('Get Pairing Code');
    this.loading = false;
    this.pairingCode = 'UHS723';

  }

  async onPair(): Promise<void> {
    const user = await this.pioneerService.unlockKeystore('test');

    console.log('user: ', user);
    this.userService.setUser(user);

    this.closeModal.next();
  }

  clearKeystore() {
    this.back.emit();
  }
}
