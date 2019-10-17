import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { SysUserEditComponent } from './edit/sys-user-edit.component';
import { NzMessageService, NzModalService, ModalOptionsForService, NzNotificationService } from 'ng-zorro-antd';
import { Result } from '@core/common/result';
import { SysUserService } from 'app/service/sys-user.service';
import { SysUserRoleComponent } from './user-role/sys-user-role.component';
import { SysUserAddComponent } from './add/sys-user-add.component';


@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
})
export class SysUserComponent implements OnInit {
  // 选中的数据
  checkedIds: string[] = [];

  // 表格数据
  data: any = [];

  // 查询加载中
  loading = false;

  // 查询参数
  q: any = {
    username: '',
    gender: '',
    page: 1
  };

  genderEnum = [
    { label: '请选择', value: '' },
    { label: '男', value: 'MALE' },
    { label: '女', value: 'FEMALE' },
    { label: '保密', value: 'UNKNOWN' }
  ];

  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: '头像', type: 'img', index: 'avatar' },
    { title: '用户名', index: 'username' },
    { title: '性别', index: 'gender' },
    { title: '邮箱', index: 'email' },
    {
      title: '编辑',
      buttons: [
        {
          text: '编辑', icon: 'edit', type: 'modal', component: SysUserEditComponent,
          // SysUserEditComponent的this.modal.close(next.msg)会返回一个值到这来;
          click: (record, modal) => { this.message.success(modal); this.refresh(); }
        },
        {
          text: '角色', icon: 'team', type: 'drawer', drawer: {
            component: SysUserRoleComponent, size: 300
          }
        },
        {
          text: '删除', icon: 'delete', type: 'del', click: (record) => {
            this.sysUserService.delete(record.id).subscribe((res) => {
              this.message.success(res.msg)
              this.refresh();
            });
          }
        }
      ]
    }
  ];

  constructor(private sysUserService: SysUserService, private modal: ModalHelper,
    private message: NzMessageService, private notification: NzNotificationService) {
  }


  ngOnInit() {
    this.query();
  }

  // 查询数据
  query() {
    this.loading = true;
    this.q.page = 1;
    this.checkedIds = [];
    return this.sysUserService.findByPage(this.q).subscribe((result: Result) => {
      this.data = result.data;
      this.q.page = result.data.number;
      this.q.size = result.data.size;
      this.loading = false;
    });
  }

  add() {
    this.modal.create(SysUserAddComponent).subscribe((result: Result) => {
      if (result.code === 200) {
        this.message.success(result.msg);
        this.refresh();
      } else {
        this.notification.error('保存失败', result.msg);
      }

    });
  }

  // 刷新
  refresh() {
    this.sysUserService.findByPage(this.q).subscribe((result: Result) => {
      this.data = result.data;
    });
  }

  onChange(ev: STChange) {
    if (ev.type === 'pi') {  // 换页操作
      this.q.page = ev.pi;
      this.q.size = ev.ps;
      this.refresh();
    }
    if (ev.type === 'checkbox') { // 选中操作
      this.checkedIds = [];
      ev.checkbox.forEach(item => {
        this.checkedIds.push(item.id);
      });
    }
  }

  // 批量删除
  deleteBatchIds() {
    this.sysUserService.deleteBatch(this.checkedIds).subscribe(result => {
      this.checkedIds = [];
      this.refresh();
    });
  }


}
