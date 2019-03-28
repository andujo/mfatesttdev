import { Component, TemplateRef, Input  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 
@Component({
  selector: 'app-modal-mfa',
  templateUrl: './modal-mfa.component.html',
  styleUrls: ['./modal-mfa.component.css']
})
export class ModalMFAComponent {
  @Input() userName: string;
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  constructor(private modalService: BsModalService) {}

  /*
  otpauth://totp/usuario@tiempodev.com?secret=JBSWY3DPEHPK3PXP&issuer=TiempoDev
  */

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }
}