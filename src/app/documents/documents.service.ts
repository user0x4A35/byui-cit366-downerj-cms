import { Injectable, EventEmitter } from '@angular/core';

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

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentID = this.getMaxID();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }

    return null;
  }

  getMaxID() {
    let maxID = 0;
    for (let document of this.documents) {
      let currentID = +document.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    this.maxDocumentID++;
    document.id = (this.maxDocumentID).toString();
    this.documents.push(document);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let index = this.documents.indexOf(originalDocument);
    if (index < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[index] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    }

    this.documents.splice(index, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
