import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-student',
  templateUrl: './courses-student.component.html',
  styleUrls: ['./courses-student.component.css']
})
export class CoursesStudentComponent implements OnInit {
  courses: any=[];
  decodedToken: any;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    let token= sessionStorage.getItem("jwt");
    this.decodedToken= this.decodeToken(token);

    // Create Object
    const obj= {
      role: this.decodedToken.role,
      studentId: this.decodedToken.userId
    }
    // Display Student's Registered Courses For Student Start
    this.courseService.getCoursesEnrollmentByIdStudent(obj).subscribe(
      (response)=>{
        console.log("Here response from FE", response.coursesEnrollment);
        
        this.courses= response.coursesEnrollment; 
      });
  }
  // Display Student's Registered Courses For Student End

  // Decoded Token
  decodeToken(token: string) {
    return jwt_decode(token);
    }
}
