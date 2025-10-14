import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowGodComponent } from './know-god.component';

describe('KnowGodComponent', () => {
  let component: KnowGodComponent;
  let fixture: ComponentFixture<KnowGodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowGodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowGodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
