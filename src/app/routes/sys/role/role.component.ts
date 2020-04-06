import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService, ModalOptionsForService, NzNotificationService } from 'ng-zorro-antd';
import { Result } from '@shared/result';
import { SysRoleService } from 'app/routes/sys/role/shared/sys-role.service';
import { RoleModalComponent } from './modal/role-modal.component';
import { timer } from 'rxjs';


@Component({
  selector: 'sys-role',
  templateUrl: './role.component.html'
})
export class SysRoleComponent implements OnInit {

  // 选中的数据
  checkedIds: string[] = [];

  // 表格数据
  data: any = {};

  // 查询加载中
  loading = false;

  // 查询参数
  q: any = {
    name: '',
    page: 1
  };

  @ViewChild('st', { static: true }) st: STComponent;

  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: '角色', index: 'name' },
    {
      title: '编辑',
      buttons: [
        {
          text: '编辑', icon: 'edit', type: 'modal',
          modal: {
            component: RoleModalComponent,
            params: (record) => ({ record, title: '编辑角色' })
          },
          click: (record, modal) => { this.message.success(modal.msg); this.refresh(); }
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
    this.modal.create(RoleModalComponent, { title: '新增角色' }).subscribe((result) => {
      this.message.success(result.msg);
      this.refresh();
    });
  }

  // 刷新
  refresh() {
    this.sysRoleService.findByPage(this.q).subscribe((result) => {
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
