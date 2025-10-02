import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectGroupComponent } from './connect-group.component';

describe('ConnectGroupComponent', () => {
  let component: ConnectGroupComponent;
  let fixture: ComponentFixture<ConnectGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
