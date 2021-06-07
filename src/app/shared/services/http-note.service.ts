import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note, NoteType } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class HttpNoteService {
  routeApinote = 'http://localhost:3000/notes';
  routeApitype = 'http://localhost:3000/types';
  constructor(private http: HttpClient) { }
  getData(dataNote: boolean): Promise<any> {
    if (dataNote) {
      return this.http.get(this.routeApinote).toPromise();
    } else {
      return this.http.get(this.routeApitype).toPromise();
    }
  }

  postData(data, dataNote: boolean) {
    if (dataNote) {
      return this.http.post(this.routeApinote, data).toPromise();
    } else {
      return this.http.post(this.routeApitype, data).toPromise();
    }
  }

  deleteNote(id: number) {
      return this.http.delete(this.routeApinote+'/'+id).toPromise();
  }

  putNote(note: Note) {
      return this.http.put(this.routeApinote+'/'+note.id, note).toPromise();
  }

  deleteTypes(type: NoteType) {
      return this.http.delete(this.routeApitype+'/'+type.id).toPromise();
  }
}
