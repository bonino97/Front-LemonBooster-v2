import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  _waybackurls:boolean = true; 
  _spider:boolean = false; 
  _directoryBruteforce:boolean = false; 

  constructor(public wsService: WebsocketService) { }

  ngOnInit(): void {
    
  }
  
  open(value){
    switch(value){
      case 1: 
        this._waybackurls = true; 
        this._spider = false; 
        this._directoryBruteforce = false; 
        break;
      case 2: 
        this._waybackurls = false; 
        this._spider = true; 
        this._directoryBruteforce = false; 
        break;
      case 3: 
        this._waybackurls = false; 
        this._spider = false; 
        this._directoryBruteforce = true; 
        break;
    }
  }
}
