import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsCenterComponent } from './kids-center.component';

describe('KidsCenterComponent', () => {
  let component: KidsCenterComponent;
  let fixture: ComponentFixture<KidsCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
