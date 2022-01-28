import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus: boolean = false;

  constructor(public socket: Socket, private router: Router) {
    console.log(socket);
  }

  CheckStatus() {
    this.socket.on('connect', () => {
      console.log('Connected to Server.');
      return (this.socketStatus = true);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Server.');
      return (this.socketStatus = false);
    });
  }

  Emit(event: string, payload?: any, callback?: Function) {
    console.log(event, payload, callback);
    this.socket.emit(event, payload, callback);
  }

  Listen(event: string) {
    console.log(event);
    return this.socket.fromEvent(event);
  }
}
