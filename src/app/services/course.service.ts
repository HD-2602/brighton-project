import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL: string= "http://localhost:3002/api/courses";

  constructor(private httpClient: HttpClient) { }

  getAllCourses(){
    return this.httpClient.get<{courses: any}>(this.courseURL);
  }
  getCourses(){
    return this.httpClient.get<{courses: any, msg: number}>(`${this.courseURL}/andTeachers`);
  }

  getCourseById(id){
    return this.httpClient.get<{course: any}>(`${this.courseURL}/${id}`);
  }
  getCoursesByIdTeacher(idTeacher){
    return this.httpClient.get<{courses: any}>(`${this.courseURL}/teacher/${idTeacher}`);
  }

  deleteCourse(id){
    return this.httpClient.delete<{isDeleted : boolean}>(`${this.courseURL}/${id}`);
  }

  addCourse(course: any, image: File){
    let formData= new FormData();
    formData.append("courseName", course.courseName);
    formData.append("duration", course.duration);
    formData.append("price", course.price);
    formData.append("description", course.description);
    formData.append("teacherId", course.teacherId);
    formData.append("img", image);
    return this.httpClient.post<{msg: number}>(this.courseURL, formData);
  }
  editCourse(newCourse: any, avatar: File){
    if (typeof avatar == "object") {

    let formData= new FormData();
    formData.append("_id", newCourse._id);
    formData.append("courseName", newCourse.courseName);
    formData.append("duration", newCourse.duration);
    formData.append("price", newCourse.price);
    formData.append("description", newCourse.description);
    formData.append("img", avatar);
    return this.httpClient.put<{msg : number}>(this.courseURL, formData);
    } else {
      return this.httpClient.put<{msg : number}>(this.courseURL, newCourse);
    } 
  }

  createEnrollment(enrollment: any){
      return this.httpClient.post<{msg: number}>(this.courseURL+'/courseEnrollment', enrollment);
  }
  
  getCoursesEnrollmentByIdStudent(objUser){
    return this.httpClient.post<{coursesEnrollment: any, msg: number}>(`${this.courseURL}/coursesEnrollmentByIdStudent`, objUser);
  }
  getCoursesEnrollmentByChildTel(childTel){
    return this.httpClient.get<{coursesEnrollment: any, msg: number}>(`${this.courseURL}/coursesEnrollmentByChildTel/${childTel}`);
  }
}
