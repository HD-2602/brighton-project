import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  decodedToken: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    // Declaration Attributes
    this.loginForm = this.formBuilder.group({
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]]
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        // Error Message: Phone Number Not Available
        if (response.msg == 0) {
          Swal.fire({
            icon: "error",
            title: "Check Your Phone Number/PWD!",
            text: "Something went wrong!",
          });
        } 
        // Error Message: PPWD is Inexact
        else if (response.msg == 1) {
          Swal.fire({
            icon: "error",
            title: "Check Your Phone Number/PWD!",
            text: "Something went wrong!",
          });
        } 
        else if (response.msg == 2) {
          this.decodedToken = this.decodeToken(response.user);
          // Admin: Go To The Admin Page 
          if (this.decodedToken.role == "admin") {
            this.router.navigate(['admin']);
            sessionStorage.setItem("jwt", response.user);

          }
           // Confirmed Teacher : Go To The CoursesTeacher Page  
          else if (this.decodedToken.role == "teacher") {
            this.router.navigate(['coursesTeacher']);
            sessionStorage.setItem("jwt", response.user);
          }
           // Student: Go To The Home Page  
          else if (this.decodedToken.role == "student") {
            this.router.navigate(['']);
            sessionStorage.setItem("jwt", response.user);
          }
          // Parent: Go To The Home Page   
          else {
            this.router.navigate(['']);
            sessionStorage.setItem("jwt", response.user);
          }
        }
        // Unconfirmed Teacher
        else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your account is saved, please wait for the confirmation",
            showConfirmButton: false,
            timer: 10000
          });
        }
      });
  }

  // Decoded Token
  decodeToken(token: string) {
    return jwt_decode(token);
  }

}
