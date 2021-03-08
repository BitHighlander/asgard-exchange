import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { KeystoreService } from 'src/app/_services/keystore.service';

@Component({
  selector: 'app-pioneer',
  templateUrl: './pioneer.component.html',
  styleUrls: ['./pioneer.component.scss']
})
export class PioneerComponent implements OnInit {
  pairingCode: string;
  keystore;
  @Output() back: EventEmitter<null>;
  @Output() closeModal: EventEmitter<null>;

  constructor(private userService: UserService, private keystoreService: KeystoreService) {
    this.back = new EventEmitter<null>();
    this.closeModal = new EventEmitter<null>();
  }

  ngOnInit(): void {
    console.log('Get Pairing Code');
    this.pairingCode = 'UHS723';
  }

  clearKeystore() {
    this.back.emit();
  }
}
