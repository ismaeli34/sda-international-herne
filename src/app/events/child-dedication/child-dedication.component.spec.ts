import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDedicationComponent } from './child-dedication.component';

describe('ChildDedicationComponent', () => {
  let component: ChildDedicationComponent;
  let fixture: ComponentFixture<ChildDedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDedicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildDedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
