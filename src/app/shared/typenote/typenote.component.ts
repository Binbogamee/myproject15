import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteType } from '../interfaces/note';

@Component({
  selector: 'app-typenote',
  templateUrl: './typenote.component.html',
  styleUrls: ['./typenote.component.css']
})
export class TypenoteComponent implements OnInit {

  editMode = false;
  strtypes: string;
  typesname = [];

  @Input() typesArray: NoteType[] = [];
  @Output() deletetypes = new EventEmitter<null>();
  @Output() saveedittypes = new EventEmitter<Array<string>>();

  constructor() { }

  ngOnInit(): void {
    for (let item of this.typesArray) {
      this.typesname.push(item.name);
    }
  }

  onDelTypes() {
    this.deletetypes.emit();
  }

async onSaveTypes() {
      this.typesname = []
      this.typesname = this.strtypes.split("\n");
      let arr = [];
      for (let a of this.typesname) {
        if (a != "") {
          arr.push(a);
        }
      }
      this.typesname = arr;
      this.saveedittypes.emit(this.typesname);
      this.editMode = false;
  }

  onedit() {
    this.typesname = [];
    for (let type of this.typesArray) {
      let s = type.name;
      this.typesname.push(s);
    }
    this.strtypes = this.typesname.join("\n");
  }

}
