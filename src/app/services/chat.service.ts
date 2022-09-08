import { Observable } from 'rxjs';
import  io from 'socket.io-client';

export class ChatService {

  private _url = 'http://localhost:3000';
  private _socket;

  constructor() {
    this._socket = io(this._url);
  }

  public sendMessage(message: string) {
    this._socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this._socket.on('new-message', (message: any) => {
        observer.next(message);
      });
    });
  };

}
