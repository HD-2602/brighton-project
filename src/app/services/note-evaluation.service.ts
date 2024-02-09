import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteEvaluationService {
  noteEvalURL: string= "http://localhost:3002/api/notesEvaluations";
  constructor(private httpClient: HttpClient) { }

  addNote(obj: any){
    return this.httpClient.post<{msg: number}>(`${this.noteEvalURL}/appendNoteEvaluation`, obj);
  }
  getNoteEvalution(target: any){
    return this.httpClient.post<{doc: any, msg: number}>(this.noteEvalURL, target);
  }
}
