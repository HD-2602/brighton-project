import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  decodedToken: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // The Actor Is Logged In
  isLoggedIn(): boolean{
    let token = sessionStorage.getItem('jwt');
   if (token) {
    this.decodedToken = this.decodeToken(token);
   }
    return !!token;
  }

  // Logout Function
  logout(){
    sessionStorage.removeItem("jwt");
    this.router.navigate([""]);
  }

  // Decoded Token
  decodeToken(token: string) {
    return jwt_decode(token);
    }

}
