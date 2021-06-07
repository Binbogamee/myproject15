import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note, NoteType } from '../interfaces/note';

@Component({
  selector: 'app-mynote',
  templateUrl: './mynote.component.html',
  styleUrls: ['./mynote.component.css']
})
export class MynoteComponent implements OnInit {

  @Input() mynote: Note;
  @Input() types: NoteType[];
  @Output() deleteNote = new EventEmitter<number>();
  @Output() editNote = new EventEmitter<Note>();

  temptype: string;
  editMode = false;

  mynoteForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    const controls = {
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      text: [null, [Validators.required, Validators.maxLength(300)]],
      type: [null],
      createDate: [null]
    };
    this.mynoteForm = this.fb.group(controls);

    if (this.mynote) {
      this.mynoteForm.patchValue(this.mynote);
    }
  }

  getData() {
    try {
      let idx = this.types.findIndex(elm => elm.id == this.mynote.type);
      if (idx != -1) {
        this.temptype = this.types[idx].name;
      } else {
        this.temptype = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

  onDeleteNote(id: number) {
    this.deleteNote.emit(id);
  }

  onSaveEditNote() {
    let note: Note;
    let tempnote = this.mynoteForm.value;
    note = this.mynoteForm.value;
    if (typeof tempnote.type == 'string') {
      let idx = this.types.findIndex(elm => elm.name == tempnote.type);
      note.type = this.types[idx].id;
    }
    note.editDate = new Date();
    this.editNote.emit(note);
    this.editMode = false;
  }

}
