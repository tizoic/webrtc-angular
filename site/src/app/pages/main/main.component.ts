import { Component } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})


export class MainComponent {
  wscCall!: WscCall;
  constructor(){
    this.wscCall = new WscCall();
  }
  setIceCheckInterval(time: number) {
    debugger
    this.wscCall.setIceCheckInterval(time);
  }
}
