import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { SysUserEditComponent } from "./edit/sys-user-edit.component";
import { NzMessageService } from "ng-zorro-antd";
import { Result } from '@core/common/result';
import { SysUserService } from 'app/service/sys-user.service';
import { SysUserRoleComponent } from './user-role/sys-user-role.component';


@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
})
export class SysUserComponent implements OnInit {

  //选中的数据
  checkedIds: string[] = [];

  // 表格数据
  data: any = [];

  //查询加载中
  loading = false;

  //查询参数
  q: any = {
    username: "",
    gender: ""
  }

  genderEnum = [
    { label: "请选择", value: "" },
    { label: "男", value: "MALE" },
    { label: "女", value: "FEMALE" },
    { label: "保密", value: "UNKNOWN" }
  ]

  @ViewChild('st') st: STComponent;

  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: '头像', type: 'img', index: 'avatar' },
    { title: '用户名', index: 'username' },
    { title: '邮箱', index: 'email' },
    {
      title: '编辑',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        {
          text: '编辑', icon: 'edit', type: 'modal', component: SysUserEditComponent, click: (record, modal) => { }
        },
        {
          text: '角色', icon: 'team', type: 'drawer', click: (record, modal) => { this.message.info(modal) }, drawer: { component: SysUserRoleComponent, size: 300 }
        }
      ]
    }
  ];

  constructor(private sysUserService: SysUserService, private modal: ModalHelper, private message: NzMessageService) {
  }


  ngOnInit() {
    this.getData();
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  reset() {
    this.q = {};
  }

  getData() {
    this.loading = true;
    return this.sysUserService.getSysUsers(this.q).subscribe((result: Result) => {
      this.data = result.data;
      this.loading = false;
    });
  }

  onChange(ev: STChange) {
    if (ev.type === "pi") {  // 换页操作
      this.sysUserService.getSysUsers({ ...this.q, page: ev.pi, size: ev.ps }).subscribe((result: Result) => {
        this.data = result.data;
      });
    }
    if (ev.type === "checkbox") { // 选中操作
      this.checkedIds = [];
      ev.checkbox.forEach(item => {
        this.checkedIds.push(item.id);
      })
    }
  }

  //批量删除
  deleteBatchIds(){
    //this.modal.open
  }

}
