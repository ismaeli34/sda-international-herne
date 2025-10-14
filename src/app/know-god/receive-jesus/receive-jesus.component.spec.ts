import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveJesusComponent } from './receive-jesus.component';

describe('ReceiveJesusComponent', () => {
  let component: ReceiveJesusComponent;
  let fixture: ComponentFixture<ReceiveJesusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveJesusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveJesusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
