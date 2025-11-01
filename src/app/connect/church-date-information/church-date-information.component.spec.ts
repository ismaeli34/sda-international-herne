import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchDateInformationComponent } from './church-date-information.component';

describe('ChurchDateInformationComponent', () => {
  let component: ChurchDateInformationComponent;
  let fixture: ComponentFixture<ChurchDateInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchDateInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchDateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
