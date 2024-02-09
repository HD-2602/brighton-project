import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {
  teacherInfoForm: FormGroup;
  parentInfoForm: FormGroup;
  user: any;
  imagePreview: string;
  role: string;
  idUser: any;
  courses: any;
  firstName: string;
  cvTeacher: string;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idUser= this.activatedRoute.snapshot.paramMap.get('id');
    this.role= this.activatedRoute.snapshot.paramMap.get('role');

    // Declaration Attributes For Teacher
    this.teacherInfoForm= this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      speciality: [""],
      address: [""],
      email: [""]
    });

    // Declaration Attributes For Parent
    this.parentInfoForm= this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      profession: [""],
      address: [""],
      childTel: [""],
      childName: [""],
      email: [""]
    });

    // Get Teacher By Id
    if (this.role == "teacher") {
      this.userService.getUserById(this.idUser).subscribe(
        (response)=>{
          console.log("Here into User", response.user );
          this.user= response.user;
          this.imagePreview= response.user.avatar;
          this.cvTeacher= response.user.cvPdf;
          this.firstName= response.user.firstName;
        });
        // Get Teacher's Courses
      this.courseService.getCoursesByIdTeacher(this.idUser).subscribe(
        (response)=>{
          this.courses= response.courses;
        });
    }
    // Get Parent By Id and Display the Name of his Child
    else if(this.role == "parent") {
      this.userService.getParentById(this.idUser).subscribe(
        (response)=>{
          this.user= response.parent;
          this.user.childName= response.child.firstName;;
          this.imagePreview= response.parent.avatar;
        });
    }
  }

  // Display Cv of Teacher
  showCv(){
    if (this.cvTeacher) {
      Swal.fire({
        title: 'Curriculum Vitae',
        html: `<iframe src="${this.cvTeacher}" width="100%" height="500px"></iframe>`,
        customClass: {
          confirmButton: 'btn btn-warning',
        },
        showCloseButton: true,
        showConfirmButton: false,
        width: '80%',
        heightAuto: true,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No CV Available',
        text: 'Sorry, no CV is available for this teacher.',
      });
    }
  
  }
  
  // Go Back To The Preview Page
  goBack(){
    this.router.navigate(["admin"]);
  }
}
