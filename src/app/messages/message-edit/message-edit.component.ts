import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent: EventEmitter<Message> = new EventEmitter<Message>();
  currentSender: string = "Jimmy Downer";

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const msgSubject: string = this.subjectRef.nativeElement.value;
    const msgText: string = this.msgTextRef.nativeElement.value;
    let id: string = "040243";
    let msg: Message = new Message(id, msgSubject, msgText, this.currentSender);
    this.addMessageEvent.emit(msg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
