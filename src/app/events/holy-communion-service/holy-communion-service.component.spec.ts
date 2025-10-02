import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolyCommunionServiceComponent } from './holy-communion-service.component';

describe('HolyCommunionServiceComponent', () => {
  let component: HolyCommunionServiceComponent;
  let fixture: ComponentFixture<HolyCommunionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolyCommunionServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolyCommunionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
