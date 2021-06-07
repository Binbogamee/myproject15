import { Component } from '@angular/core';
import { Note, NoteType } from './shared/interfaces/note';
import { HttpNoteService } from './shared/services/http-note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  notes: Note[];
  types: NoteType[];
  postTypes = false;
  note: Note = { id: 0, name: '', text: '', type: 0, createDate: new Date() };
  edit = false;

  constructor(private HttpNoteService: HttpNoteService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.types = (await this.HttpNoteService.getData(false));
      this.notes = (await this.HttpNoteService.getData(true)) || [];
    } catch (error) {
      console.log(error);
    }
  }

  async onSaveNote(note: Note) {
    try {
      // let s = this.notes.length;
      // let lastid: number;
      // if (s == 0) {
      //   lastid = 0;
      // } else {
      //   lastid = this.notes[s - 1].id;
      // }
      // note.id = ++lastid;
      await this.HttpNoteService.postData(note, true);
    } catch (error) {
      console.log(error);
    } finally {
      this.getData();
    }

  }

  async onDeleteNote(id: number) {
    try {
      await this.HttpNoteService.deleteNote(id);
    } catch (error) {
      console.log(error);
    } finally {
      this.getData();
    }
  }

  async onEditNote(note: Note) {
    try {
      note.editDate = new Date();
      await this.HttpNoteService.putNote(note);
    } catch (error) {
      console.log(error);
    } finally {
      this.getData();
    }
  }

  async onPostTypes() {
    this.postTypes = !this.postTypes;
  }

  async onDeleteTypes() {
    try {
      let arrPromises = this.types.map(item => this.HttpNoteService.deleteTypes(item));
    await Promise.all(arrPromises);
    } catch (error) {
      console.log(error)
    } finally {
      this.getData();
    }
  }

  async onSaveTypes(arr: Array<string>) {
    try {
      let arrPromises1 = this.types.map(item => this.HttpNoteService.deleteTypes(item));
    await Promise.all(arrPromises1);
      let arrPromises = arr.map(item => this.HttpNoteService.postData({name:item }, false));
      let res = await Promise.all(arrPromises);
      this.types = await this.HttpNoteService.getData(false);
      this.types.sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
}
