import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-my-score',
  templateUrl: './my-score.component.html',
  styles: []
})
export class MyScoreComponent implements OnInit {

  constructor(private message: NzMessageService) { }

  list: any[];


  ngOnInit() {
  }

  change(ev) {
    if (ev.type == 'success') {
      let result = ev.file.response;
      if (result.code == 200) {
        this.message.success(result.msg);
      } else {
        this.message.error(result.msg);
      }
    }
  }

}
