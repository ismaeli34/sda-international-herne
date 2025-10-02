import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaturdayWorshipServiceComponent } from './saturday-worship-service.component';

describe('SaturdayWorshipServiceComponent', () => {
  let component: SaturdayWorshipServiceComponent;
  let fixture: ComponentFixture<SaturdayWorshipServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaturdayWorshipServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaturdayWorshipServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
