import { Component, TemplateRef, Input, OnInit   } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { encode } from 'hi-base32';

@Component({
  selector: 'app-modal-mfa',
  templateUrl: './modal-mfa.component.html',
    styleUrls: ['./modal-mfa.component.css'],
  providers: [BsModalRef]
})
export class ModalMFAComponent implements OnInit {
  model: any = {};
  public onClose: Subject<string>;
  public usrQrCode: string = null;
  public userName: string;
  title: string;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) {
    this.userName = 'Default';
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.usrQrCode = 'otpauth://totp/' + this.userName + '?secret=' + encode(this.userName) + '&issuer=TiempoDev';
  }

  public login(): void {
    this.onClose.next(this.model.mfacode);
    this.bsModalRef.hide();
  }

  public cancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}

