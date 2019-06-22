import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sys-role-edit',
  templateUrl: './sys-role-edit.component.html',
})
export class SysRoleEditComponent implements OnInit {
  record: any = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
  ) {}

  ngOnInit(): void {
  }

  save(value: any) {
  }

  close() {
    this.modal.destroy();
  }
}
