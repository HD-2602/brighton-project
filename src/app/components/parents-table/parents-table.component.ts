import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parents-table',
  templateUrl: './parents-table.component.html',
  styleUrls: ['./parents-table.component.css']
})
export class ParentsTableComponent implements OnInit {
  parentsTab: any=[];
  role: string= "parent";
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    // Call Generic Function: Gel All Users By Role For Admin
    this.getAll();
  }

// Delete Parent By Id For Admin Take Back All the Parents
  deleteParent(idParent){
    this.userService.deleteUser(idParent).subscribe(
      (response)=>{
        if (response.isDeleted) {
          this.getAll();
        }
      });
  }

  // Go To The Next Page
  goTo(parentId, parentRole){
    this.router.navigate([`infoUser/${parentId}/${parentRole}`]);
  }

  // Generic Function: Gel All Users By Role For Admin
  getAll(){
    this.userService.getUsersByRole(this.role).subscribe(
      (response)=>{
        this.parentsTab= response.users;
      });
  }

}
