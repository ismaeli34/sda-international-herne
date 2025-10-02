import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUpcomingEventCardComponent } from './update-upcoming-event-card.component';

describe('UpdateUpcomingEventCardComponent', () => {
  let component: UpdateUpcomingEventCardComponent;
  let fixture: ComponentFixture<UpdateUpcomingEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUpcomingEventCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUpcomingEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
