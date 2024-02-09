import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit {
  searchCoursesForm: FormGroup;
  enrollmentCourses: any;
  constructor(private formBuilder: FormBuilder,
    private courseService: CourseService

  ) { }

  ngOnInit() {
    // Declaration Attribute
    this.searchCoursesForm = this.formBuilder.group({
      childTel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]]
    });
  }

  // Search Registered Courses Of Student By Child Tel
  searchCourses() {
    this.courseService.getCoursesEnrollmentByChildTel(this.searchCoursesForm.value.childTel).subscribe(
      (response) => {
        // Error Message: Student Not Exist
        if (response.msg == 0) {
          Swal.fire({
            icon: "error",
            title: "Oops, this student is not exist",
            text: "Something went wrong!"
          });
        } 
         // Error Message
        else if (response.msg == 1) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!"
          });
        }
        // Get Registered Courses Of Student By Child Tel
        else {
          this.enrollmentCourses = response.coursesEnrollment;
        }
      });
  }
}
