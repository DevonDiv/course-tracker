import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseWorkComponent } from './edit-course-work.component';

describe('EditCourseWorkComponent', () => {
  let component: EditCourseWorkComponent;
  let fixture: ComponentFixture<EditCourseWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
