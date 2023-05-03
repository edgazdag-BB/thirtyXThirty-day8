import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  displayedColumns: string[] = ['id', 'name', 'note', 'category', 'delete'];
  
  constructor(public noteService: NoteService) {}
}
