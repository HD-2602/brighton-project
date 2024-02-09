import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-teachers',
  templateUrl: './search-teachers.component.html',
  styleUrls: ['./search-teachers.component.css']
})
export class SearchTeachersComponent implements OnInit {
  searchTeachersForm: FormGroup;
  teacher: any= {};
  teachers: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // Search Teachers By Speciality For Teacher 
  searchTeachers(){
    let speciality= this.toTitleCase(this.teacher.speciality);
    this.userService.getTeachersBySpeciality(speciality).subscribe(
      (response)=>{
        if (response.teachers.length == 0) {
          Swal.fire({
            icon: "error",
            title: "There isn't any teacher in this specialty!",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        } else {
          this.teachers= response.teachers;
        }
      });
  }

  // Custom title case method
  toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

}
