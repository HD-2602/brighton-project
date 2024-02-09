import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  id: any;
  imagePreview: string;
  decodedToken: any;
  courseValidate: any;
  title: string = "Add Course";


  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    // Declaration Attributes
    this.courseForm= this.formBuilder.group({
      courseName: ["",[Validators.required, Validators.minLength(3)]],
      duration: ["",[Validators.required, Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      img: [""]
    });

    // If Edit: Display Course
    if (this.id) {
      this.title= "Edit Course";
      this.courseService.getCourseById(this.id).subscribe(
        (response)=>{
          this.courseValidate= response.course;    
          this.imagePreview= response.course.avatar;
        });
    } 
  }

  // Add Course Or Edit Course Start
  validateCourse(){
    let token= sessionStorage.getItem('jwt');
    this.decodedToken= this.decodeToken(token);

    // Edit Course Start
    if (this.id) {
      this.courseForm.value._id= this.id;
      this.courseService.editCourse(this.courseForm.value, this.courseForm.value.img).subscribe(
        (response)=>{
          if (response.msg == 1) {
            this.router.navigate(["coursesTeacher"]);
          } else {
            Swal.fire({
              icon: "error",
              title: "Edit Course Failed",
              text: "Something went wrong!",
            });
          }
        });
        // Edit Course End
    } 
    // Add Course Start
    else {
      this.courseForm.value.teacherId= this.decodedToken.userId;
      this.courseService.addCourse(this.courseForm.value, this.courseForm.value.img).subscribe(
        (response)=>{
          if (response.msg == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops, Add Course Failed",
              text: "Try again!",
            });
          } else {
            this.router.navigate(["coursesTeacher"]);
          }
        });
    }
    // Add Course End
  }
  // Add Course Or Edit Course End

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.courseForm.patchValue({ img: file });
    console.log("Here file", file);
    this.courseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);

}

// Decoded Token
decodeToken(token: string) {
  return jwt_decode(token);
  }
}
