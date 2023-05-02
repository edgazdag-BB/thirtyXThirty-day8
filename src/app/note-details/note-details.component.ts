import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent {
  @Input() note!: Note;
  @Input() noteCategories!: string[];
  @Output() noteUpdated: EventEmitter<Note> = new EventEmitter<Note>();
}
