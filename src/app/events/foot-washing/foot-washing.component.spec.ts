import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootWashingComponent } from './foot-washing.component';

describe('FootWashingComponent', () => {
  let component: FootWashingComponent;
  let fixture: ComponentFixture<FootWashingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootWashingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootWashingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
