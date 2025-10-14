import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIsJesusComponent } from './who-is-jesus.component';

describe('WhoIsJesusComponent', () => {
  let component: WhoIsJesusComponent;
  let fixture: ComponentFixture<WhoIsJesusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoIsJesusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoIsJesusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
