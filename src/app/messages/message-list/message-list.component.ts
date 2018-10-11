import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('105033', 'Claim 1', 'I claim this planet in the name of the Earth!', 'Duck Dogers'),
    new Message('105034', 'Claim 2', 'I claim this planet in the name of Mars, isn\'t that lovely?', 'Marvin the Martian'),
    new Message('105035', '<silence>', '<more silence>', 'The Void'),
  ];

  constructor() { }

  ngOnInit() {
  }
  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
