import { UserService } from './../../services/user.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  teacherForm: FormGroup;
  studentForm: FormGroup;
  parentForm: FormGroup;
  adminForm: FormGroup;
  path: string;
  imagePreview: string;
  sanitizedPDFUrl: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.path = this.router.url;
console.log("path:", this.path);

    // Declaration Teacher's Attributes 
    this.teacherForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(10)]],
      speciality: ["", [Validators.required, Validators.minLength(3)]],
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      confirmPwd: [""],
      img: [""],
      cv: [""]
    },
      {
        validator: this.MustMatch('password', 'confirmPwd')
      }
    );


    // Declaration Student's Attributes 
    this.studentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(10)]],
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      confirmPwd: [""],
      img: [""]
    },
      {
        validator: this.MustMatch('password', 'confirmPwd')
      }
    );

    // Declaration Parent's Attributes 
    this.parentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(10)]],
      profession: ["", [Validators.required, Validators.minLength(5)]],
      childTel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      confirmPwd: [""],
      img: [""]
    },
      {
        validator: this.MustMatch('password', 'confirmPwd')
      }
    );

    // Declaration Admin's Attributes 
    this.adminForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      confirmPwd: [""],
      img: [""]
    },
      {
        validator: this.MustMatch('password', 'confirmPwd')
      }
    );
  }

// Signup For Admin/Student/Teacher/Parent
  signup() {
    let role: string;

    // Signup For Teacher
    if (this.path == "/signupTeacher") {
      role = "teacher";
      this.teacherForm.value.role = role;
      this.teacherForm.value.status = "on hold"
      this.userService.signupTeacher(this.teacherForm.value, this.teacherForm.value.img, this.teacherForm.value.cv).subscribe(
        (response) => {
          // Error Message: Email and Tel Exist
          if (response.msg == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email and Tel Exist!",
            });
          }
          // Error Message: Email Exist 
          else if (response.msg == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email Exist!",
            });
          }
          // Error Message: Tel Exist 
          else if (response.msg == 2) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tel Exist!",
            });
          } else {
            // Success: Go To The Login Page
            this.router.navigate(["signin"]);
          }
        });
    }
  // Signup For Student
    else if (this.path == "/signupStudent") {
      role = "student";
      this.studentForm.value.role = role;
      console.log("Here I'm", this.studentForm.value);
      this.userService.signupStudent(this.studentForm.value, this.studentForm.value.img).subscribe(
        (response) => {
          // Error Message: Email and Tel Exist
          if (response.msg == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email and Tel Exist!",
            });
          }
          // Error Message: Email Exist 
           else if (response.msg == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email Exist!",
            });
          }
          // Error Message: Tel Exist  
          else if (response.msg == 2) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tel Exist!",
            });
          }
          // Success: Go To The Login Page 
          else {
            this.router.navigate(["signin"]);
          }
        });
    }
    // Signup For Parent
    else if (this.path == "/signupParent") {
      role = "parent";
      this.parentForm.value.role = role;
      console.log("Here I'm", this.parentForm.value);
      this.userService.signupParent(this.parentForm.value, this.parentForm.value.img).subscribe(
        (response) => {
          // Error Message: Child's Phone Number inexact
          if (response.msg == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Check Your Child's Phone Number!",
            });
          }
          // Error Message: Email and Tel Exist 
          else if (response.msg == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email and Tel Exist!",
            });
          }
          // Error Message: Email Exist
          else if (response.msg == 2) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email Exist!",
            });
          }
          // Error Message: Tel Exist
           else if (response.msg == 3) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tel Exist!",
            });
          } 
           // Success: Go To The Login Page 
          else {
            this.router.navigate(["signin"]);
          }
        });
    }
    // Signup For Admin
    else {
      role = "admin";
      this.adminForm.value.role = role;
      console.log("Here I'm", this.adminForm.value);
      this.userService.signupAdmin(this.adminForm.value, this.adminForm.value.img).subscribe(
        (response) => {
          // Error Message: Email and Tel Exist 
          if (response.msg == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email and Tel Exist!",
            });
          }
          // Error Message: Email Exist 
           else if (response.msg == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email Exist!",
            });
          }
          // Error Message: Tel Exist  
          else if (response.msg == 2) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tel Exist!",
            });
          }
           // Success: Go To The Login Page 
           else {
            this.router.navigate(["signin"]);
          }
        });
    }
  }

  // Function for Image
  onImageSelected(event: Event, idForm: FormGroup) {
    const file = (event.target as HTMLInputElement).files[0];
    idForm.patchValue({ img: file });
    idForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  // Function for PDF File
  onCvSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const pdfUrl: string = e.target.result;
      this.sanitizedPDFUrl = this.sanitizePdfUrl(pdfUrl);
    };
    reader.readAsDataURL(file);
    this.teacherForm.patchValue({ cv: file });
    this.teacherForm.updateValueAndValidity();
  }
  sanitizePdfUrl(pdfUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  // PWD and Confirm PWd Must Match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
