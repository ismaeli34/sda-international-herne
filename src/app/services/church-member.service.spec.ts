import { TestBed } from '@angular/core/testing';

import { ChurchMemberService } from './church-member.service';

describe('ChurchMemberService', () => {
  let service: ChurchMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
