import { Component } from '@angular/core';

import * as print  
    from "../../../scripts/logger";
import * as wsc from "../../../assets/scripts/wsc-call.js";    

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})


export class MainComponent {
  constructor(){
  }
  setIceCheckInterval(time: number) {
    wsc.wsccallFile.setIceCheckInterval(time);
    print.print();
  }
}
