import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../app.component.css', './contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { 
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
