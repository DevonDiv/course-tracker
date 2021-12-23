import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkButtonComponent } from './add-work-button.component';

describe('AddWorkButtonComponent', () => {
  let component: AddWorkButtonComponent;
  let fixture: ComponentFixture<AddWorkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
