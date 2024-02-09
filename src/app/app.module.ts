import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { KidsCenterComponent } from './components/kids-center/kids-center.component';
import { BlogComponent } from './components/blog/blog.component';
import { BookComponent } from './components/book/book.component';
import { ClassesComponent } from './components/classes/classes.component';
import { PopularTeachersComponent } from './components/popular-teachers/popular-teachers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { CourseComponent } from './components/course/course.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { CourseTeacherComponent } from './components/course-teacher/course-teacher.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { AssignCourseComponent } from './components/assign-course/assign-course.component';
import { RegisteredCourseComponent } from './components/registered-course/registered-course.component';
import { AssignNoteComponent } from './components/assign-note/assign-note.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { CourseStudentComponent } from './components/course-student/course-student.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { SearchTeachersComponent } from './components/search-teachers/search-teachers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { CourseAdminComponent } from './components/course-admin/course-admin.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { InfoCourseComponent } from './components/info-course/info-course.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnrolledStudentsComponent } from './components/enrolled-students/enrolled-students.component';
import { EnrolledStudentsTableComponent } from './components/enrolled-students-table/enrolled-students-table.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    KidsCenterComponent,
    BlogComponent,
    BookComponent,
    ClassesComponent,
    PopularTeachersComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CourseFormComponent,
    CoursesComponent,
    CoursesTeacherComponent,
    CourseComponent,
    TeachersComponent,
    TeacherComponent,
    AdminComponent,
    StudentsTableComponent,
    TeachersTableComponent,
    CourseTeacherComponent,
    CoursesTableComponent,
    AssignCourseComponent,
    RegisteredCourseComponent,
    AssignNoteComponent,
    CoursesStudentComponent,
    CourseStudentComponent,
    SearchCoursesComponent,
    SearchTeachersComponent,
    ProfileComponent,
    InfoUserComponent,
    CourseAdminComponent,
    MyFilterPipe,
    InfoCourseComponent,
    ParentsTableComponent,
    EnrolledStudentsComponent,
    EnrolledStudentsTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
