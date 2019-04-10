/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';


describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      providers: [AuthService, BsModalService , ComponentLoaderFactory, PositioningService, HttpClientModule]
    });
  });

  it('should exists...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

it('Should receive property currentUser from NavComponent ', ()=> {
  let fixture = TestBed.createComponent(NavComponent);
  let app = fixture.debugElement.componentInstance;
  let authService = fixture.debugElement.injector.get(AuthService);
  fixture.detectChanges();
  expect(authService.currentUser).toEqual(app.currentUser);
})

});
