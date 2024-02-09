import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-enrolled-students-table',
  templateUrl: './enrolled-students-table.component.html',
  styleUrls: ['./enrolled-students-table.component.css']
})
export class EnrolledStudentsTableComponent implements OnInit {

  enrolledStudentsTab: any=[];
  idCourse: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router:Router) { }

  ngOnInit() {
    this.idCourse= this.activatedRoute.snapshot.paramMap.get("idCourse");

    // Display Enrolled Students by Course For Teacher
    this.userService.getStudentsByIdCourse(this.idCourse).subscribe(
      (response)=>{
        this.enrolledStudentsTab= response.enrolledStudents;
      });   
  }

  // Go To The Next Page
  goToAssignNote(idStudent){
    sessionStorage.setItem('idCourse', this.idCourse);
    this.router.navigate([`assignNote/${idStudent}`]);
  }

}
