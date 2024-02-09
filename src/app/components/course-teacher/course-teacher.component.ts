import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-course-teacher',
  templateUrl: './course-teacher.component.html',
  styleUrls: ['./course-teacher.component.css']
})
export class CourseTeacherComponent implements OnInit {
  @Input() courseTeacherInput: any;
  @Output() coursesToSend:EventEmitter<any> = new EventEmitter();
  decodedToken: any;

  constructor(private courseService: CourseService,
              private router: Router) { }

  ngOnInit() {
  }
  
  // Delete Course Annd Retake Courses of this Teacher
  deleteCourse(id){
    let token= sessionStorage.getItem('jwt');
    this.decodedToken= this.decodeToken(token);
    
    this.courseService.deleteCourse(id).subscribe(
      (response)=>{
        if (response.isDeleted == true) {
          this.courseService.getCoursesByIdTeacher(this.decodedToken.userId).subscribe(
            (data)=>{
              console.log("Here data from BE", data.courses);
              // coursesToSend: output
              this.coursesToSend.emit(data.courses);
            });
        }
      });
  }

  // Go Back To The Preview Page
  goToEnrolledStudents(id){
    this.router.navigate([`enrolledStudents/${id}`]);

  }

  // Go To The Next Page
  goToEdit(id){
    this.router.navigate([`editCourse/${id}`]);

}

// Decoded Token
decodeToken(token: string) {
  return jwt_decode(token);
  }

}



  
