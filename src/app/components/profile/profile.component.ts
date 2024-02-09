import { UserService } from './../../services/user.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  role: string;
  user: any;
  decodedToken: any;
  fName: string;
  lName: string;
  studentProfileForm: FormGroup;
  teacherProfileForm: FormGroup;
  parentProfileForm: FormGroup;
  pictureForm: FormGroup;
  imagePreview: string;
  cvPreview: string;
  sanitizedPDFUrl: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const token = sessionStorage.getItem("jwt");
    this.decodedToken = this.decodeToken(token);
    this.fName = this.decodedToken.fName;
    this.lName = this.decodedToken.lName;
    this.role = this.decodedToken.role;

    // Declaration Attributes For Student
    this.studentProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(10)]]
    });
    // Declaration Attributes For Teacher
    this.teacherProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(10)]],
      speciality: ["", [Validators.required, Validators.minLength(3)]],
      cv: [""]
    });
    // Declaration Attributes For Parent
    this.parentProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(10)]],
      profession: ["", [Validators.required, Validators.minLength(5)]]
    });
    // Declaration Image Attribute For Student/Parent/Teacher
    this.pictureForm = this.formBuilder.group({
      img: [""]
    });

    // Call Generic Function: Get User By Id
    this.getUser();
  }

  // Display Teacher's CV For Teacher
  showCv(){
    if (this.cvPreview) {
      Swal.fire({
        title: 'Curriculum Vitae',
        html: `<iframe src="${this.cvPreview}" width="100%" height="500px"></iframe>`,
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
  
  // Edit Profile For Student/Parent/Teacher
  editProfile() {
    // Edit Profile For Student
    if (this.decodedToken.role == "student") {
      this.studentProfileForm.value._id = this.decodedToken.userId;
      this.userService.updateProfile(this.studentProfileForm.value).subscribe(
        (response) => {
          if (response.msg == 1) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Successfully Modified"
            });
            this.getUser();
          }else{
            Swal.fire({
              icon: "error",
              title: "Failed Modified",
              text: "Something went wrong!",
            });
          }
        });
    }
    // Edit Profile For Teacher
     else if (this.decodedToken.role == "teacher") {
      console.log("Here Into new user", this.teacherProfileForm.value);
      this.teacherProfileForm.value._id = this.decodedToken.userId;
      this.userService.updateProfileTeacher(this.teacherProfileForm.value, this.teacherProfileForm.value.cv).subscribe(
        (response) => {
          if (response.msg == 1) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Successfully Modified"
            });
            this.getUser();
          }else{
            Swal.fire({
              icon: "error",
              title: "Failed Modified",
              text: "Something went wrong!",
            });
          }
        });
    }
    // Edit Profile For Parent 
    else {
      console.log("Here Into new user", this.parentProfileForm.value);
      this.parentProfileForm.value._id = this.decodedToken.userId;
      this.userService.updateProfile(this.parentProfileForm.value).subscribe(
        (response) => {
          if (response.msg == 1) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Successfully Modified"
            });
            this.getUser();
          }else{
            Swal.fire({
              icon: "error",
              title: "Failed Modifed",
              text: "Something went wrong!",
            });
          }
        });
    }
  }

  // Edit Picture For Student/Parent/Teacher
  editPicture() {
    this.pictureForm.value.id = this.decodedToken.userId;
    this.userService.updateProfilePicture(this.pictureForm.value, this.pictureForm.value.img).subscribe(
      (response)=>{
        // Success Message: Successfully Modified
        if (response.msg == 1) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Modified"
          });
        }
        // Error Message: Failed Modified
        else{
          Swal.fire({
            icon: "error",
            title: "Failed Modified",
            text: "Something went wrong!",
          });
        }
      });
  }

  // Decoded Token
  decodeToken(token: string) {
    return jwt_decode(token);
  }

  // Function For Image
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.pictureForm.patchValue({ img: file });
    console.log("Here file", file);
    this.pictureForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

   // Function For PDF
  onCvSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const pdfUrl: string = e.target.result;
      this.sanitizedPDFUrl = this.sanitizePdfUrl(pdfUrl);
    };
    reader.readAsDataURL(file);
    this.teacherProfileForm.patchValue({ cv: file });
    this.teacherProfileForm.updateValueAndValidity();
  }

  sanitizePdfUrl(pdfUrl: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  // Generic Function: Get User By Id
  getUser(){
    this.userService.getUserById(this.decodedToken.userId).subscribe(
      (response) => {
        console.log("Here Into user", response.user);
        this.user = response.user;
        this.imagePreview = response.user.avatar;
        if (this.decodedToken.role == 'teacher') {
          this.cvPreview = response.user.cvPdf;
        }
      });
  }

}
