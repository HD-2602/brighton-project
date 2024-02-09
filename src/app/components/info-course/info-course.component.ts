import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-info-course',
  templateUrl: './info-course.component.html',
  styleUrls: ['./info-course.component.css']
})
export class InfoCourseComponent implements OnInit {
  infoCourseForm: FormGroup;
  imagePreview: string;
  course: any;
  idCourse: string;
  enrolledStudents: any;

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.idCourse= this.activatedRoute.snapshot.paramMap.get('id');

    //Declaration Attributes 
    this.infoCourseForm= this.formBuilder.group({
      courseName: [""],
      duration: [""],
      price: [""],
      description: [""]
    });

    // Display Course By Id
    this.courseService.getCourseById(this.idCourse).subscribe(
      (response)=>{
        this.course= response.course;
      });
      // Display enrolled Students In this Course
      this.userService.getStudentsByIdCourse(this.idCourse).subscribe(
        (response)=>{
          console.log("Here into Students", response.enrolledStudents);
          
          this.enrolledStudents= response.enrolledStudents;
        });
  }

  // Go Back To The Preview Page
  goBack(){
    this.router.navigate(["admin"]);
  }

}
