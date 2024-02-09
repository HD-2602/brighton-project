import { AssignCourseComponent } from './components/assign-course/assign-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { AssignNoteComponent } from './components/assign-note/assign-note.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { SearchTeachersComponent } from './components/search-teachers/search-teachers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { InfoCourseComponent } from './components/info-course/info-course.component';
import { EnrolledStudentsComponent } from './components/enrolled-students/enrolled-students.component';


const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"signin", component: LoginComponent},
  {path:"signupTeacher", component: SignupComponent},
  {path:"signupStudent", component: SignupComponent},
  {path:"signupParent", component: SignupComponent},
  {path:"signupAdmin", component: SignupComponent},
  {path:"addCourse", component: CourseFormComponent},
  {path:"editCourse/:id", component: CourseFormComponent},
  {path:"courses", component: CoursesComponent},
  {path:"teachers", component: TeachersComponent},
  {path:"coursesTeacher", component: CoursesTeacherComponent},
  {path:"admin", component: AdminComponent},
  {path:"assignCourse/:id", component: AssignCourseComponent},
  {path:"enrolledStudents/:idCourse", component: EnrolledStudentsComponent},
  {path:"assignNote/:idStudent", component: AssignNoteComponent},
  {path:"registeredCourse", component: CoursesStudentComponent},
  {path:"searchCourses", component: SearchCoursesComponent},
  {path:"searchTeachers", component: SearchTeachersComponent},
  {path:"profile", component: ProfileComponent},
  {path:"infoUser/:id/:role", component: InfoUserComponent},
  {path:"infoCourse/:id", component: InfoCourseComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
