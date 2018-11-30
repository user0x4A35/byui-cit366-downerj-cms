import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
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
    this.maxDocumentID = this.getMaxID();
  }

  getDocuments(): void {
    this
    .http
    .get('https://byui-cit366-cms-downerj.firebaseio.com/documents.json')
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentID = this.getMaxID();
      this.documents.sort((lhs: Document, rhs: Document): number => {
        if (lhs < rhs) {
          return -1;
        } else if (lhs === rhs) {
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

    this.maxDocumentID++;
    document.id = (this.maxDocumentID).toString();
    this.documents.push(document);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }

    let index = this.documents.indexOf(originalDocument);
    if (index < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[index] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    }

    this.documents.splice(index, 1);
    this.storeDocuments();
  }

  storeDocuments(): void {
    let json = JSON.stringify(this.documents);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put('https://byui-cit366-cms-downerj.firebaseio.com/documents.json', json, {
      headers: header
    }).subscribe(() => {
      this.documentListChangedEvent.next((this.documents.slice()));
    });
  }
}
