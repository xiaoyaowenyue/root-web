import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-my-award',
  templateUrl: './my-award.component.html',
  styles: []
})
export class MyAwardComponent implements OnInit {

  constructor() { }
  serverUrl: string = environment.SERVER_URL;

  ngOnInit() {
  }

}
