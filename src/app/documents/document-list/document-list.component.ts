import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("505", "Blob.xml", "A blob", "http://", null),
    new Document("506", "Instructions.txt", "Instructions for the user", "http://", null),
    new Document("404", "missing.html", "A redirect page when a file is missing", "http://", null),
    new Document("200", "success.html", "A test webpage", "http://", null),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
