import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipClassComponent } from './membership-class.component';

describe('MembershipClassComponent', () => {
  let component: MembershipClassComponent;
  let fixture: ComponentFixture<MembershipClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
