import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledStudentsTableComponent } from './enrolled-students-table.component';

describe('EnrolledStudentsTableComponent', () => {
  let component: EnrolledStudentsTableComponent;
  let fixture: ComponentFixture<EnrolledStudentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolledStudentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
