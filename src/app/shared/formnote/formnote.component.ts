import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note, NoteType } from '../interfaces/note';

@Component({
  selector: 'app-formnote',
  templateUrl: './formnote.component.html',
  styleUrls: ['./formnote.component.css']
})
export class FormnoteComponent implements OnInit {

  noteForm!: FormGroup;
  postTypes = false;

  constructor(private fb: FormBuilder) { }

  @Input() types: NoteType[];

  @Output() saveNewNote = new EventEmitter<Note>();
  @Output() typesout = new EventEmitter(); //отображение типов

  ngOnInit(): void {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(50)]],
      text: [null, [Validators.required, Validators.maxLength(300)]],
      type: [null, Validators.required]
    }

    this.noteForm = this.fb.group(controls);
  }

  onSaveNote() {
    let note: Note;
    let tempnote = this.noteForm.value;
    note = this.noteForm.value;
    let idx = this.types.findIndex(elm => elm.name == tempnote.type);
    note.type = this.types[idx].id;
    note.id = 0;
    note.createDate = new Date();
    this.saveNewNote.emit(note);
    this.noteForm.reset();
  }

  onPostTypes() {
    this.typesout.emit();
    this.postTypes = !this.postTypes;
  }

}
