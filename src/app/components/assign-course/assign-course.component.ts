import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {

  assignForm: FormGroup;
  teachers: any = [];
  courses: any = [];
  idStudent: any;
  selectedTeacher: string;
  selectedCourse: string;
  registeredCourses: any = [];
  fnStudent: string;
  lnStudent: string;
  decodedToken: any;
  obj: any;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    // Declaration of Inputs
    this.assignForm = this.formBuilder.group({
      selectedTeacher: [""],
      selectedCourse: [""]
    });

    this.idStudent = this.activatedRoute.snapshot.paramMap.get("id");
    let token = sessionStorage.getItem("jwt");
    this.decodedToken = this.decodeToken(token);
    console.log("Here Role", this.decodedToken.role);
    this.obj = {
      role: this.decodedToken.role,
      studentId: this.idStudent
    }

    // Get Student By Id
    this.userService.getUserById(this.idStudent).subscribe(
      (response) => {
        this.fnStudent = response.user.firstName;
        this.lnStudent = response.user.lastName;
      });

    //Get the first 4 Courses that are Added To Student 
    this.courseService.getCoursesEnrollmentByIdStudent(this.obj).subscribe(
      (response) => {
        console.log("Here courses Enrollment from FE", response.coursesEnrollment);
        if (response.msg = 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        this.registeredCourses = response.coursesEnrollment;
      });
 
    // Get Teachers who are confirmed by admin
    this.userService.getTeachersConfirmed().subscribe(
      (response) => {
        console.log("Here teachers", response.teachers);
        this.teachers = response.teachers;
      });
  }

  // Get all Teacher's Courses
  coursesTeacher(id) {
    this.courseService.getCoursesByIdTeacher(id).subscribe(
      (response) => {
        this.courses = response.courses;
      });
  }

  // Add Course To Student Start
  assignCourse() {
    // Error Message if click the button without select any course
    if (!this.selectedCourse) {
      Swal.fire({
        icon: "error",
        title: "Select Teacher Or Course",
      });
    } else {
      const enrollment = {
        courseId: this.selectedCourse,
        studentId: this.idStudent
      }
      // Add Course to student
      this.courseService.createEnrollment(enrollment).subscribe(
        (response) => {
          // Error message that if student is already enrolled in this course
          if (response.msg == 0) {
            Swal.fire({
              icon: "error",
              title: `Oops, ${this.fnStudent} is already enrolled in this course`,
            });
          } 
          // Error message
          else if (response.msg == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops, assign course failed",
              text: "Something went wrong!",
            });
          } 
          //Get the first 4 Courses that are Added To Student
          else {
            this.courseService.getCoursesEnrollmentByIdStudent(this.obj).subscribe(
              (response) => {
                console.log("Here coursesEnrollment from FE", response.coursesEnrollment);
                this.registeredCourses = response.coursesEnrollment;
              });
            Swal.fire({
              title: "Good job!",
              text: "Course added successfully!",
              icon: "success"
            });
          }
        });
    }
  }
  // Add Course To Student End

  // Go back To the page  Go back To the admin page
  goBack() {
    this.router.navigate(["admin"]);
  }
  // Decode The Token
  decodeToken(token: string) {
    return jwt_decode(token);
  }

  // For the Output
  updateEnrollmentCourses(tab: any) {
    this.registeredCourses = tab;
  }
}
