import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../app.component.css', './contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact("1", "Bro. Jackson", "jacksonk@byui.edu", "208-496-3771", "https://web.byui.edu/Directory/Employee/jacksonk.jpg", null),
    new Contact("2", "Bro. Barzee", "barzeer@byui.edu", "208-496-3768", "https://web.byui.edu/Directory/Employee/barzeer.jpg", null),
    new Contact("3", "Bro. Thayne", "thayneti@byui.edu", "208-496-3777", "https://web.byui.edu/Directory/Employee/thayneti.jpg", null),
    new Contact("4", "Bro. Helfrich", "helfrichj@byui.edu", "208-496-7608", "https://web.byui.edu/Directory/Employee/helfrichj.jpg", null),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
