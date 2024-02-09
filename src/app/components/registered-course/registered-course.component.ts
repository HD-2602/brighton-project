import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-registered-course',
  templateUrl: './registered-course.component.html',
  styleUrls: ['./registered-course.component.css']
})
export class RegisteredCourseComponent implements OnInit {

  @Input() registeredCourseInput: any;
  @Output() registeredCoursesToSend: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
