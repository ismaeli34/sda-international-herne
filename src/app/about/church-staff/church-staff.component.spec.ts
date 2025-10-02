import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchStaffComponent } from './church-staff.component';

describe('ChurchStaffComponent', () => {
  let component: ChurchStaffComponent;
  let fixture: ComponentFixture<ChurchStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
