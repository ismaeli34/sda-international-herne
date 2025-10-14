import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyINeedJesusComponent } from './why-i-need-jesus.component';

describe('WhyINeedJesusComponent', () => {
  let component: WhyINeedJesusComponent;
  let fixture: ComponentFixture<WhyINeedJesusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyINeedJesusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyINeedJesusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
