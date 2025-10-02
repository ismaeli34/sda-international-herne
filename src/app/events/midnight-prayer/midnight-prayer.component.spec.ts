import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidnightPrayerComponent } from './midnight-prayer.component';

describe('MidnightPrayerComponent', () => {
  let component: MidnightPrayerComponent;
  let fixture: ComponentFixture<MidnightPrayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidnightPrayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidnightPrayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
