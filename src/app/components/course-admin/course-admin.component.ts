import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.css']
})
export class CourseAdminComponent implements OnInit {
  @Input() courseAdminInput: any;

  constructor() { }

  ngOnInit() {
  }

}
