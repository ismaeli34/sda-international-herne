import { TestBed } from '@angular/core/testing';

import { ChurchInfoService } from './church-info.service';

describe('ChurchInfoService', () => {
  let service: ChurchInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
