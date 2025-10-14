import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationDeckComponent } from './animation-deck.component';

describe('AnimationDeckComponent', () => {
  let component: AnimationDeckComponent;
  let fixture: ComponentFixture<AnimationDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationDeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
