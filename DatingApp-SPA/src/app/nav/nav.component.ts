import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { ModalMFAComponent } from '../modal-mfa/modal-mfa.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
photoUrl: string;
bsModalRef: BsModalRef;

  constructor(public authService: AuthService,
  private alertify: AlertifyService,
  private router: Router,
  private modalService: BsModalService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }


  login() {
    const initialState = {
    userName : this.model.username,
    title: 'QR Code'
    };
    this.bsModalRef  = this.modalService.show(ModalMFAComponent, {initialState});
    this.bsModalRef .content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((result: string) => {
      this.model.mfacode = result;
      this.authService.login(this.model).subscribe(next => {
        this.alertify.sueccess('Logged in Successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
    });
  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged Out');
    this.router.navigate(['/home']);
  }

}
