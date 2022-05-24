import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { Message } from './chat-box.model';
const SOCKET_ENDPOINT = 'localhost:5000';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  socket: any;
  message!: string;
  messageList: Array<Message> = [];
  constructor() {}

  ngOnInit(): void {
    this.setupSocketConnection();
  }
  //rec via another
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      console.log('data', data);

      if (data) {
        this.messageList.push({ msg: data, type: 'rcv' });
        console.log(this.messageList, 'list');
      }
    });
  }

  //send msg from user
  sendMsg() {
    alert(this.message);
    this.socket.emit('message', this.message);

    this.messageList.push({ msg: this.message, type: 'sent' });
    this.message = '';
  }
}
