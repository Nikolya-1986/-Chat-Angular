import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  public message!: string;
  public messages: string[] = [];
  public secretCode!: string;

  constructor(
    private chatService: ChatService
    ) {
  }

  ngOnInit() {
    this._setMessage();
  }

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  };

  private _setMessage() {
    this.chatService
    .getMessages()
    .distinctUntilChanged()
    .filter((message: { trim: () => { (): any; new(): any; length: number; }; }) => message.trim().length > 0)
    .throttleTime(1000)
    .skipWhile((message: string) => message !== this.secretCode)
    .scan((acc: string, message: string, index: number) =>
        `${message}(${index + 1})`
      , 1)
    .subscribe((message: string) => {
      const currentTime = moment().format('hh:mm:ss a');
      const messageWithTimestamp = `${currentTime}: ${message}`;
      this.messages.push(messageWithTimestamp);
    });
  };

}
