import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkButtonComponent } from './delete-work-button.component';

describe('DeleteWorkButtonComponent', () => {
  let component: DeleteWorkButtonComponent;
  let fixture: ComponentFixture<DeleteWorkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWorkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWorkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
