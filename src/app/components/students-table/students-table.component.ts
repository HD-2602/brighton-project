import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  studentsTab: any = [];
  role: string = "student";

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  // Call Generic Function: Gel All Users By Role For Admin
    this.getAll();
  }

  // Delete Student By Id For Admin Take Back All the Students
  deleteStudent(idStudent) {
    this.userService.deleteUser(idStudent).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getAll();
        }
      });
  }
  
  // Go To The Next Page
  goToAssignCourse(idStudent) {
    this.router.navigate([`assignCourse/${idStudent}`]);
  }

  // Generic Function: Gel All Users By Role For Admin
  getAll() {
    this.userService.getUsersByRole(this.role).subscribe(
      (response) => {
        this.studentsTab = response.users;
      });
  }

}
