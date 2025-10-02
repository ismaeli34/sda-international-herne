import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeAndMissionComponent } from './purpose-and-mission.component';

describe('PurposeAndMissionComponent', () => {
  let component: PurposeAndMissionComponent;
  let fixture: ComponentFixture<PurposeAndMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurposeAndMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurposeAndMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
