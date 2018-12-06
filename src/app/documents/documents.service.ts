import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  maxDocumentID: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments(): void {
    this
    .http
    .get<{message: String, document: Document}>('http://localhost:3000/documents')
    .subscribe((response: any) => {
      this.documents = response.documents;
      this.maxDocumentID = this.getMaxID();
      this.documents.sort((lhs: Document, rhs: Document): number => {
        if (lhs.id < rhs.id) {
          return -1;
        } else if (lhs.id === rhs.id) {
          return 0;
        } else {
          return 1;
        }
      });
      this.documentListChangedEvent.next(this.documents.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getDocument(id: string): Document {
    if (!this.documents) {
      return null;
    }

    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let document of this.documents) {
      let currentID = +document.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addDocument(document: Document): void {
    if (!document) {
      return;
    }

    // this.maxDocumentID++;
    // document.id = (this.maxDocumentID).toString();
    // this.documents.push(document);
    // this.storeDocuments();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    document.id = '';

    this.http
    .post<{message: String, document: Document}>('http://localhost:3000/documents', document, {headers: headers})
    // .map((response: Response) => {
    //   return response.json();
    // })
    .subscribe((response: any) => {
      this.documents.push(response.document);
      this.documents.sort((lhs: Document, rhs: Document): number => {
        if (lhs.id < rhs.id) {
          return -1;
        } else if (lhs.id === rhs.id) {
          return 0;
        } else {
          return 1;
        }
      });
      this.getDocuments();
    });
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }

    let index = this.documents.indexOf(originalDocument);
    if (index < 0) {
      return;
    }

    // newDocument.id = originalDocument.id;
    // this.documents[index] = newDocument;
    // this.storeDocuments();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http
    .put<{message: String}>(`http://localhost:3000/documents/${originalDocument.id}`, strDocument, {headers: headers})
    // .map((response: Response) => {
    //   return response.json();
    // })
    .subscribe((response: any) => {
      this.getDocuments();
    });
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    }

    // this.documents.splice(index, 1);
    // this.storeDocuments();

    this.http.delete<{message: String}>(`http://localhost:3000/documents/${document.id}`)
    // .map((response: Response) => {
    //   return response.json();
    // })
    .subscribe((response: any) => {
      this.getDocuments();
    })
  }

  storeDocuments(): void {
    let json = JSON.stringify(this.documents);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put('http://localhost:3000/documents', json, {
      headers: header
    }).subscribe(() => {
      this.getDocuments();
    });
  }
}
