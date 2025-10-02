import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerMeetingsComponent } from './prayer-meetings.component';

describe('PrayerMeetingsComponent', () => {
  let component: PrayerMeetingsComponent;
  let fixture: ComponentFixture<PrayerMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
