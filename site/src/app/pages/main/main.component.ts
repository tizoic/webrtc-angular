import { Component } from '@angular/core';

declare var wscCall: any; 

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})


export class MainComponent {
  constructor(){
  }
  setIceCheckInterval(time: number) {
    debugger
    wscCall.setIceCheckInterval(time);
  }
}
