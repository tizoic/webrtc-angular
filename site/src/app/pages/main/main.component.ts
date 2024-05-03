import { Component } from '@angular/core';

import * as print  
    from "../../../scripts/logger";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})


export class MainComponent {
  constructor(){
  }
  setIceCheckInterval(time: number) {
    
    print.print();
  }
}
