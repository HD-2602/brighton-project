import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any=[];
 
  constructor(private courseService: CourseService) { }

  ngOnInit() {

    // Display All Courses 
    this.courseService.getAllCourses().subscribe(
      (response)=>{
        this.courses= response.courses;
      });
  }

}
