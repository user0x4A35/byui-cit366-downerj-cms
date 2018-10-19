import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  currentSender: string = "2";

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const msgSubject: string = this.subjectRef.nativeElement.value;
    const msgText: string = this.msgTextRef.nativeElement.value;
    const id: string = "040243";
    let msg: Message = new Message(id, msgSubject, msgText, this.currentSender);
    this.messageService.addMessage(msg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
