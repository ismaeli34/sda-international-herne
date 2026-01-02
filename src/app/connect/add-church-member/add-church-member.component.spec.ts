import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChurchMemberComponent } from './add-church-member.component';

describe('AddChurchMemberComponent', () => {
  let component: AddChurchMemberComponent;
  let fixture: ComponentFixture<AddChurchMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChurchMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChurchMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
