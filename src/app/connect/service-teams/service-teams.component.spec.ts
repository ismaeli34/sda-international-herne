import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTeamsComponent } from './service-teams.component';

describe('ServiceTeamsComponent', () => {
  let component: ServiceTeamsComponent;
  let fixture: ComponentFixture<ServiceTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
