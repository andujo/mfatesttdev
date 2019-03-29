import { Component, TemplateRef, Input, OnInit   } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 
@Component({
  selector: 'app-modal-mfa',
  templateUrl: './modal-mfa.component.html',
    styleUrls: ['./modal-mfa.component.css']
})
export class ModalMFAComponent implements OnInit{
  title: string;
  closeBtnName: string;
  list: any[] = [];
 // @Input() userName: string;
  //modalRef: BsModalRef | null;
  //modalRef2: BsModalRef;
  constructor(private bsModalRef: BsModalRef) {}
  
  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
  /*
  otpauth://totp/usuario@tiempodev.com?secret=JBSWY3DPEHPK3PXP&issuer=TiempoDev
  */

  /*
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }
  */
}