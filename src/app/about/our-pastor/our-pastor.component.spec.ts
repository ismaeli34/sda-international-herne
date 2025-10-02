import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPastorComponent } from './our-pastor.component';

describe('OurPastorComponent', () => {
  let component: OurPastorComponent;
  let fixture: ComponentFixture<OurPastorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurPastorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurPastorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
