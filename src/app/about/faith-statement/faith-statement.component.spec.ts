import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaithStatementComponent } from './faith-statement.component';

describe('FaithStatementComponent', () => {
  let component: FaithStatementComponent;
  let fixture: ComponentFixture<FaithStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaithStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaithStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
