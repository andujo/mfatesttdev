import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMFAComponent } from './modal-mfa.component';

describe('ModalMFAComponent', () => {
  let component: ModalMFAComponent;
  let fixture: ComponentFixture<ModalMFAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMFAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
