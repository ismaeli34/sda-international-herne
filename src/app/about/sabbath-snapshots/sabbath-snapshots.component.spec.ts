import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabbathSnapshotsComponent } from './sabbath-snapshots.component';

describe('SabbathSnapshotsComponent', () => {
  let component: SabbathSnapshotsComponent;
  let fixture: ComponentFixture<SabbathSnapshotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SabbathSnapshotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabbathSnapshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
