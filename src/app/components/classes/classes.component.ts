import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  courses: any= [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    // Get All Courses and Display the First 6 
    this.courseService.getAllCourses().subscribe(
      (response)=>{
        console.log("Here response from FE", response.courses);
        this.courses= response.courses.slice(0,6);
      });
  }
}
