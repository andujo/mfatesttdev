import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { encode } from 'hi-base32';
import { ModalMFAComponent } from './modal-mfa.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { NavComponent } from '../nav/nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';

class MockEncode {
  navigate = jasmine.createSpy('navigate');
  }


describe('ModalMFAComponent', () => {
  let component: ModalMFAComponent;
  let fixture: ComponentFixture<ModalMFAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMFAComponent, NavComponent ],
      imports: [QRCodeModule, FormsModule, RouterTestingModule, ModalModule.forRoot() ],
      providers: [AuthService,BsModalRef, 
      {
        provide: encode, useClass: MockEncode
      }]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ModalMFAComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect( app ).toBeTruthy();
    });

});
