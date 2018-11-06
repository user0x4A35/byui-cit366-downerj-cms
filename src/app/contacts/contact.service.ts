import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  maxContactID: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }

    return null;
  }

  getMaxID() {
    let maxID = 0;
    for (let contact of this.contacts) {
      let currentID = +contact.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addDocument(contact: Contact) {
    if (!contact) {
      return;
    }

    this.maxContactID++;
    contact.id = (this.maxContactID).toString();
    this.contacts.push(contact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateDocument(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let index = this.contacts.indexOf(originalContact);
    if (index < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[index] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const index = this.contacts.indexOf(contact);
    if (index < 0) {
      return;
    }

    this.contacts.splice(index, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
