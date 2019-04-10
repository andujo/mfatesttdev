/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';

import { NavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [
        FormsModule, RouterTestingModule, HttpClientModule],
        providers : [BsModalService, BsModalRef, ComponentLoaderFactory, PositioningService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
