import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkButtonComponent } from './edit-work-button.component';

describe('EditWorkButtonComponent', () => {
  let component: EditWorkButtonComponent;
  let fixture: ComponentFixture<EditWorkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
