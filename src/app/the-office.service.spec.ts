import { TestBed } from '@angular/core/testing';

import { TheOfficeService } from './the-office.service';

describe('TheOfficeService', () => {
  let service: TheOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
