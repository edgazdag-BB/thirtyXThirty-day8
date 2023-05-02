import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note';
import { Subject, tap } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'note', 'category', 'delete'];
  noteList: Note[] = [];
  currentNote!: Note;

  constructor(public noteService: NoteService) {}

  ngOnInit() {
    this.getNotes();
  }

  updateDetails(note: Note) {
    if (note.id !== 0) {
      this.noteService.updateNoteDetails(note)
        .pipe(
          tap(n => this.noteList = this.noteList.map(curNote => curNote.id === note.id ? n : curNote)),
          tap(n => this.currentNote = n))
        .subscribe();
    } else {
      this.noteService.saveNewNote(note)
      .pipe(
        tap(n => this.noteList = [...this.noteList, n]),
        tap(n => this.currentNote = n))
      .subscribe();
    }
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id)
      .pipe(
        tap(() => this.noteList = this.noteList.filter(curNote => curNote.id !== id)),
        tap(() => this.currentNote?.id === id ? this.noteService.setCurrentNote(undefined) : void 0)
      )
      .subscribe();
  }

  getNotes()  {
    this.noteService.getNotes().pipe(
        tap(notes => this.noteList = notes)
      )
    .subscribe();
  }
}
