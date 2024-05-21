import { Component } from '@angular/core';
import { CallService } from '../../services/callservice.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})


export class MainComponent {
  constructor(private callService: CallService) { }

  makeCall() {
    debugger
    this.callService.makeCall()
  }

  showControls() {
    return this.callService.shControls.asObservable();
  }
}
