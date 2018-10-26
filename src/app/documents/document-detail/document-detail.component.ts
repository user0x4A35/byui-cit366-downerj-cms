import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  // @Input() document: Document;
  document: Document;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.document = this.documentService.getDocument(params.id);
    });
  }

}
