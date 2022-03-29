import { TestBed } from '@angular/core/testing';

import { UserLangService } from './user-lang.service';

describe('UserLangService', () => {
  let service: UserLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
