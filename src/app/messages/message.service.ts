import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messagesChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }

    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messagesChangedEvent.emit(this.messages.slice());
  }
}
