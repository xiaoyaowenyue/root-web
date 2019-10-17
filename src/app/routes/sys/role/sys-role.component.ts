import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService, ModalOptionsForService, NzNotificationService } from 'ng-zorro-antd';
import { Result } from '@core/common/result';
import { SysRoleService } from 'app/service/sys-role.service';
import { SysRoleEditComponent } from './edit/sys-role-edit.component';
import { SysRoleAddComponent } from './add/sys-role-add.component';


@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
})
export class SysRoleComponent implements OnInit {

  // 选中的数据
  checkedIds: string[] = [];

  // 表格数据
  data: any = [];

  // 查询加载中
  loading = false;

  // 查询参数
  q: any = {
    name: '',
    page: 1
  };

  @ViewChild('st') st: STComponent;

  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: '角色', index: 'name' },
    {
      title: '编辑',
      buttons: [
        {
          text: '编辑', icon: 'edit', type: 'modal', component: SysRoleEditComponent, click: (record, modal) => { this.message.success(modal.msg); this.refresh(); }
        },
        // {
        // tslint:disable-next-line: max-line-length
        //   text: '权限', icon: 'team', type: 'drawer', click: (record, modal) => { this.message.info(modal) }, drawer: { component: SysUserRoleComponent, size: 300 }
        // },
        {
          text: '删除', icon: 'delete', type: 'del', click: (record) => {
            this.sysRoleService.delete(record.id).subscribe(() => {
              this.refresh();
            });
          }
        }
      ]
    }
  ];

  constructor(private sysRoleService: SysRoleService, private modal: ModalHelper,
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
    this.sysRoleService.findByPage(this.q).subscribe((result) => {
      this.data = result.data;
      this.q.page = result.data.number;
      this.q.size = result.data.size;
      this.loading = false;
    });
  }

  add() {
    this.modal.create(SysRoleAddComponent).subscribe((result: Result) => {
      if (result.code == 200) {
        this.message.success(result.msg);
        this.refresh();
      } else {
        this.notification.error("提示:", result.msg);
      }
    });
  }

  // 刷新
  refresh() {
    this.sysRoleService.findByPage(this.q).subscribe((result: Result) => {
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
    this.sysRoleService.deleteBatch(this.checkedIds).subscribe(result => {
      this.checkedIds = [];
      this.refresh();
    });
  }

}
