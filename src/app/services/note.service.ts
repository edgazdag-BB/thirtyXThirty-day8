import { Inject, Injectable } from '@angular/core';
import { Note } from '../models/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

//export c//

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  idIndex: string = '';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  API_URL: string = "https://json-server-vercel-five-chi.vercel.app/";
  noteCategories: string[] = ['Work', 'School', 'Personal', ]
  
  currentNote?: Note;
  noteList!: Note[];

  constructor(private http: HttpClient) {}

  addNote(): Note {
    //this.idIndex = Math.random().toString(16).slice(2);
    console.log(this.idIndex);
    this.currentNote = {  id: 0,
      name: '',
      note: '',
      category: '',
    }

    return this.currentNote;
  }

  getNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.API_URL + "notes", this.httpOptions)
      .pipe(
        tap(() => console.log('grabbed notes')),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  getNote(id: number): Note | undefined {
    this.http.get<Note>(this.API_URL + "notes/" + id, this.httpOptions)
      .pipe(
        tap(() => console.log(`grab note id=${id}`)),
        catchError(this.handleError<Note>('getNote'))
      )  
      .subscribe(note => this.currentNote = note);

    return this.currentNote; 
  }

  updateNoteDetails(note: Note) {
    return this.http.put<Note>(this.API_URL + "notes/" + note.id, note, this.httpOptions).pipe(
      tap(() => console.log(`updated note id=${note.id}`)),
      catchError(this.handleError<Note>('updateNoteDetails'))
    );
  }

  saveNewNote(note: Note) {
    return this.http.post<Note>(this.API_URL + "notes", note, this.httpOptions).pipe(
      tap(() => console.log('Saved new note')),
      catchError(this.handleError<Note>('saveNewNote'))
    );
  }

  deleteNote(id: number) {
    return this.http.delete<Note>(this.API_URL + "notes/" + id, this.httpOptions).pipe(
      tap(() => console.log(`deleted note id=${id}`)),
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  getNoteCategories(): string[] {
    return this.noteCategories;
  }

  setCurrentNote(note?: Note) {
    this.currentNote = note ? {...note} : note;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
