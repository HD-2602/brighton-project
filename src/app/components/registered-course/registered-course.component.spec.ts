import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCourseComponent } from './registered-course.component';

describe('RegisteredCourseComponent', () => {
  let component: RegisteredCourseComponent;
  let fixture: ComponentFixture<RegisteredCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
