/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';


describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],      
      providers: [UserService]
    });
  });

  it('should exists', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
