/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertifyService } from './alertify.service';
import { NavComponent } from '../nav/nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';

describe('Service: Alertify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations :[NavComponent],
      providers: [AlertifyService, BsModalService, ComponentLoaderFactory, PositioningService],
      imports: [RouterTestingModule, FormsModule, HttpClientModule]
    });
  });


  it('should exists ...', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
  }));

  it('Should pass message from NavComponent to alertifyService ', ()=> {
    let fixture = TestBed.createComponent(NavComponent);
    let app = fixture.debugElement.componentInstance;
    let alertifyService = fixture.debugElement.injector.get(AlertifyService);
    fixture.detectChanges();
    expect( alertifyService.success("success") ).toEqual(app.alertify.success());
  })
   

});
