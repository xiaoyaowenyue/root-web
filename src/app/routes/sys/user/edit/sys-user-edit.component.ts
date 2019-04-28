import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'app-sys-user-edit',
  templateUrl: './sys-user-edit.component.html',
})
export class SysUserEditComponent implements OnInit {

  record: any = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    console.log(this.record);
  }

  save(value: any) {
    this.http.put(`/api/v1/sysUsers/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
