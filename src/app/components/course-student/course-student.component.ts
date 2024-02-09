import { NoteEvaluationService } from './../../services/note-evaluation.service';
import { Component, Input, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import 'animate.css';


@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.css']
})
export class CourseStudentComponent implements OnInit {
  @Input() courseStudentInput: any;
  decodedToken: any;

  constructor(private noteEvaluationService: NoteEvaluationService) { }

  ngOnInit() {
  }

  // Display Student's Score For Student and Parent Start
  showNote(idCourse) {
    let token = sessionStorage.getItem("jwt");
    this.decodedToken = this.decodeToken(token);

    // Create Object
    const target = {
      idUser: this.decodedToken.userId,
      idCourse: idCourse,
      role: this.decodedToken.role,
      childTel: this.decodedToken.childTel
    }
    // Get the Score of Student 
    this.noteEvaluationService.getNoteEvalution(target).subscribe(
      (response) => {
        console.log("Here response From FE", response);

        // Message For Student That He/She don't have a score yet
        if (response.msg == 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "you don't have a score yet!",
            showConfirmButton: false,
            timer: 10000
          });
        }
        // Message For Parent That Student don't have a score yet
        else if (response.msg == 2) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The student don't have a score yet!",
            showConfirmButton: false,
            timer: 10000
          });
        }
        // Display Score To Student
        else if (response.msg == 1) {
          const note = response.doc.note;
          console.log("Here object from FE", response.doc);
          Swal.fire({
            title: 'Your Score',
            text: `Your score for this course is: ${note}`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        }
        // Display Score To Parent
        else {
          const note = response.doc.note;
          console.log("Here object from FE", response.doc);
          Swal.fire({
            title: 'The Score',
            text: `Score for this course is: ${note}`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        }

      }
    );
  }
  // Display Student's Score For Student and Parent End

  // Display Student's Evaluation For Student and Parent Start
  showEvaluation(idCourse) {
    let token = sessionStorage.getItem("jwt");
    this.decodedToken = this.decodeToken(token);

    // Create Object
    const target = {
      idUser: this.decodedToken.userId,
      idCourse: idCourse,
      role: this.decodedToken.role,
      childTel: this.decodedToken.childTel
    }
    // Get Evaluation of Student 
    this.noteEvaluationService.getNoteEvalution(target).subscribe(
      (response) => {
        console.log("Here response ", response);

        // Message For Student That He/She don't have an evaluation yet
        if (response.msg == 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "you don't have an evaluation yet!",
            showConfirmButton: false,
            timer: 10000
          });
        }
        // Message For Parent That Student don't have an evaluation yet
        else if (response.msg == 2) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The student don't have an evaluation yet!",
            showConfirmButton: false,
            timer: 10000
          });
        }
         // Display Evaluation To Student
        else if (response.msg == 1) {
          const evaluation = response.doc.evaluation;
          console.log("Here object from FE", response.doc);
          Swal.fire({
            title: 'Your Evaluation',
            text: `Your evaluation for this course is: ${evaluation}`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        }
        // Display Evaluation To Parent
        else {
          const evaluation = response.doc.evaluation;
          console.log("Here object from FE", response.doc);
          Swal.fire({
            title: 'The Evaluation',
            text: `Evaluation for this course is: ${evaluation}`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        }
      });
  }
  // Display Student's Evaluation For Student and Parent End


  // Decoded Token
  decodeToken(token: string) {
    return jwt_decode(token);
  }

}
