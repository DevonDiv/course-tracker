import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerTabsComponent } from './tracker-tabs.component';

describe('TrackerTabsComponent', () => {
  let component: TrackerTabsComponent;
  let fixture: ComponentFixture<TrackerTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
