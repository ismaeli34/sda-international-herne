import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomCardComponent } from './zoom-card.component';

describe('ZoomCardComponent', () => {
  let component: ZoomCardComponent;
  let fixture: ComponentFixture<ZoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
