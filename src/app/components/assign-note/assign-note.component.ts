import { NoteEvaluationService } from './../../services/note-evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-note',
  templateUrl: './assign-note.component.html',
  styleUrls: ['./assign-note.component.css']
})
export class AssignNoteComponent implements OnInit {

  assignNoteForm: FormGroup;
  idStudent: any;

  constructor(private formBuilder:FormBuilder,
              private activatedRoute: ActivatedRoute,
              private noteEvaluationService: NoteEvaluationService,
              private router: Router
  ) { }

  ngOnInit() {
    this.idStudent= this.activatedRoute.snapshot.paramMap.get("idStudent");

    // Declaration of Inputs
    this.assignNoteForm= this.formBuilder.group({
      note: ["", [Validators.required, Validators.min(0), Validators.max(20)]],
      evaluation: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(300)]]
    });
  }
  // Assign Note and Evaluation Start
  assignNote(){
    let idCourse= sessionStorage.getItem("idCourse");
    
    // Create an Object
    const noteEvaluation= {
      note: this.assignNoteForm.value.note,
      evaluation: this.assignNoteForm.value.evaluation,
      idStudent: this.idStudent,
      idCourse: idCourse
    }

    // Add Note and Evaluation To Student
    this.noteEvaluationService.addNote(noteEvaluation).subscribe(
      (response)=>{
        // Error message that if student is already had a score
        if (response.msg == 0) {
          Swal.fire({
            icon: "error",
            title: "Oops, this student already had his/her score",
            text: "Something went wrong!",
          });
        }
        // Error message  
        else if(response.msg == 1){
          Swal.fire({
            icon: "error",
            title: "Oops, assign score failed",
            text: "Something went wrong!",
          });     
        }
        // Confirmed Message
        else{
          Swal.fire({
            title: "Good job!",
            text: "successfully added !",
            icon: "success"
          });
        }
      });
  }
  // Assign Note and Evaluation End

  goBack(){
    this.router.navigate(["coursesTeacher"]);
  }
}

