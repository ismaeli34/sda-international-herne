import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabbathServicesComponent } from './sabbath-services.component';

describe('SabbathServicesComponent', () => {
  let component: SabbathServicesComponent;
  let fixture: ComponentFixture<SabbathServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SabbathServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabbathServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
