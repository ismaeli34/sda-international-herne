import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChurchStaffComponent } from './add-church-staff.component';

describe('AddChurchStaffComponent', () => {
  let component: AddChurchStaffComponent;
  let fixture: ComponentFixture<AddChurchStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChurchStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChurchStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
