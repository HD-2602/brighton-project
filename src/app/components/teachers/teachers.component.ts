import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: any=[];
 
  constructor(private userService: UserService) { }

  ngOnInit() {
    // Display all Confirmed Teachers
    this.userService.getTeachersConfirmed().subscribe(
      (response)=>{
        this.teachers= response.teachers;
      });
  }

}
