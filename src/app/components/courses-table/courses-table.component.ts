import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  coursesTab: any=[];

  constructor(private courseService: CourseService,
              private router: Router) { }

  ngOnInit() {
    // call To Generic Function To Display All Courses For Admin
    this.getAll();
  }

  // Delete Course By Admin And Retake All Courses
  deleteCourse(idCourse){
    this.courseService.deleteCourse(idCourse).subscribe(
      (response)=>{
        if (response.isDeleted) {
          this.getAll();
        }
      });
  }

  // Go To The Next Page
  displayCourse(idCourse){
    this.router.navigate([`infoCourse/${idCourse}`]);
  }

  // Generic Function: Display All Courses For Admin
  getAll(){
    this.courseService.getCourses().subscribe(
      (response)=>{
        if (response.msg == 0) {
          Swal.fire({
            icon: "error",
            title: "Oops, Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        } else {
          this.coursesTab= response.courses;
        }
      });
  }
}
