import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  teachersTab: any = [];
  role: string = "teacher";

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    // Call Generic Function: Gel All Users By Role For Admin
    this.getAll();
  }

  // Confirmed the Teacher If it's Not Confirmed 
  confirmTeacher(idTeacher) {
    this.userService.updateTeacherStatus(idTeacher).subscribe(
      (response) => {
        this.getAll();
        if (response.msg == 1) {
          Swal.fire({
            title: "Confirmed Teacher!",
            text: "You clicked the button!",
            icon: "success"
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Confirmed Teacher!",
          });
        }
      });
  }

  // Delete Teacher By Id For Admin And Take Back All the Teachers
  deleteTeacher(idTeacher) {
    this.userService.deleteUser(idTeacher).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getAll();
        }
      });
  }

   // Go To The Next Page
  goTo(teacherId, teacherRole) {
    this.router.navigate([`infoUser/${teacherId}/${teacherRole}`]);
  }

  // Generic Function: Gel All Users By Role For Admin
  getAll() {
    this.userService.getUsersByRole(this.role).subscribe(
      (response) => {
        this.teachersTab = response.users;
      });
  }
}
