import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-teachers',
  templateUrl: './popular-teachers.component.html',
  styleUrls: ['./popular-teachers.component.css']
})
export class PopularTeachersComponent implements OnInit {
  teachers: any=[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Get All Confirmed Teachers and Display Just The First 4 Teachers 
    this.userService.getTeachersConfirmed().subscribe(
      (response)=>{
        this.teachers= response.teachers.slice(0,4);
      });
  }

}
