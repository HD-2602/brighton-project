import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string= "http://localhost:3002/api/users";

  constructor( private httpClient: HttpClient ) { }

  signupTeacher( user: any, avatar: File, cv: File){
    let formData= new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("speciality", user.speciality);
    formData.append("tel", user.tel);
    formData.append("password", user.password);
    formData.append("img", avatar);
    formData.append("cv", cv);
    formData.append("role", user.role);
    formData.append("status", user.status);
    return this.httpClient.post<{msg : number}>(this.userURL + "/signupTeacher", formData);
  }

  signupStudent( user: any, avatar: File){
    let formData= new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("tel", user.tel);
    formData.append("password", user.password);
    formData.append("img", avatar);
    formData.append("role", user.role);
    return this.httpClient.post<{msg : number}>(this.userURL + "/signupStudent", formData);
  }

  signupParent( user: any, avatar: File){
    let formData= new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("profession", user.profession);
    formData.append("tel", user.tel);
    formData.append("childTel", user.childTel);
    formData.append("password", user.password);
    formData.append("img", avatar);
    formData.append("role", user.role);
    return this.httpClient.post<{msg : number}>(this.userURL + "/signupParent", formData);
  }

  signupAdmin( user: any, avatar: File){
    let formData= new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("tel", user.tel);
    formData.append("password", user.password);
    formData.append("img", avatar);
    formData.append("role", user.role);
    return this.httpClient.post<{msg : number}>(this.userURL + "/signupAdmin", formData);
  }

  login(user: any){
 return this.httpClient.post<{msg : number, user: any}>(`${this.userURL}/login`, user);
  }
  getUserById(idUser){
    return this.httpClient.get<{user: any}>(`${this.userURL}/${idUser}`);
  }
  getParentById(idUser){
    return this.httpClient.get<{parent: any, child: any}>(`${this.userURL}/getParentById/${idUser}`);
  }
  getUsersByRole(roleUser: string){
    return this.httpClient.get<{users: any}>(`${this.userURL}/getUsersByRole/${roleUser}`);
  }
  getTeachersConfirmed(){
    return this.httpClient.get<{teachers: any}>(this.userURL + "/teachers/confirmed");
  }
  getTeachersBySpeciality(speciality: any){
    return this.httpClient.get<{teachers: any}>(`${this.userURL}/searchTeachers/${speciality}`);
  }
  getStudentsByIdCourse(id){
    return this.httpClient.get<{enrolledStudents: any, msg: number}>(`${this.userURL}/getStudentsByIdCourse/${id}`);
  }
  deleteUser(id){
    return this.httpClient.delete<{isDeleted : boolean}>(`${this.userURL}/${id}`);
  }
  updateTeacherStatus(id){
    return this.httpClient.put<{msg : number}>(`${this.userURL}/updateTeacherStatus`, {idTeacher: id});
  }
  updateProfile(newUser: any){
    return this.httpClient.put<{msg: number}>(`${this.userURL}/editProfile`, newUser);
  }
  updateProfileTeacher(newTeacher: any, newCv: File){
    if (typeof newCv == "object") {

      let formData= new FormData();
      formData.append("_id", newTeacher._id);
      formData.append("firstName", newTeacher.firstName);
      formData.append("lastName", newTeacher.lastName);
      formData.append("email", newTeacher.email);
      formData.append("address", newTeacher.address);
      formData.append("speciality", newTeacher.speciality);
      formData.append("cv", newCv);
      return this.httpClient.put<{msg : number}>(`${this.userURL}/editProfileTeacher`, formData);
      } else {
        return this.httpClient.put<{msg : number}>(`${this.userURL}/editProfileTeacher`, newTeacher);
      } 
  }
  updateProfilePicture(newUser: any, avatar: File ){
    let formData= new FormData();
    formData.append("_id", newUser.id);
    formData.append("img", avatar);
    return this.httpClient.put<{msg: number}>(`${this.userURL}/editProfilePicture`, formData);
  }

}

