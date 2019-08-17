import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { G2MiniBarData } from '@delon/chart';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  miniBarData: G2MiniBarData[] = [
    { x: 0, y: 20 },
    { x: 1, y: 25 },
    { x: 2, y: 99 },
    { x: 3, y: 99 },
    { x: 4, y: 150 },
    { x: 5, y: 450 },
    { x: 6, y: 360 },
    { x: 7, y: 398 },
    { x: 8, y: 244 },
    { x: 9, y: 159 }
  ]
  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }


}
