import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchMemberListComponent } from './church-member-list.component';

describe('ChurchMemberListComponent', () => {
  let component: ChurchMemberListComponent;
  let fixture: ComponentFixture<ChurchMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchMemberListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
