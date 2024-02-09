import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-teacher',
  templateUrl: './courses-teacher.component.html',
  styleUrls: ['./courses-teacher.component.css']
})
export class CoursesTeacherComponent implements OnInit {
  decodedToken: any;
  courses: any = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    let token = sessionStorage.getItem('jwt');
    this.decodedToken = this.decodeToken(token);

    // Display Teacher's Courses By Teacher Start
    this.courseService.getCoursesByIdTeacher(this.decodedToken.userId).subscribe(
      (response) => {
        console.log("Here courses from BE", response.courses);
        this.courses = response.courses;
      });
       // Display Teacher's Courses By Teacher End
  }

  // Decoded Token
  decodeToken(token: string) {
    return jwt_decode(token);
  }

  // Output
  updateCourses(tab: any) {
    this.courses = tab;
  }
}
