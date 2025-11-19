import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchLeadersComponent } from './church-leaders.component';

describe('ChurchLeadersComponent', () => {
  let component: ChurchLeadersComponent;
  let fixture: ComponentFixture<ChurchLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchLeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
