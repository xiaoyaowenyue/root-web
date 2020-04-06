import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService, ModalOptionsForService, NzNotificationService } from 'ng-zorro-antd';
import { SysUserService } from 'app/routes/sys/user/shared/sys-user.service';
import { UserRoleComponent } from './user-role/user-role.component';
import { PageData } from '@shared/page-data';
import { UserModalComponent } from './modal/user-modal.component';
import { UserVO } from './shared/user-vo';


@Component({
  selector: 'sys-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  // 选中的数据
  checkedIds: string[] = [];

  // 表格数据
  data: PageData<UserVO> = {};

  // 查询加载中
  loading = false;

  // 查询参数
  q: any = {
    username: '',
    nickname: '',
    page: 1
  };


  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: '头像', type: 'img', index: 'avatar' },
    { title: '账号', index: 'username' },
    { title: '昵称', index: 'nickname' },
    {
      title: '编辑',
      buttons: [
        {
          text: '编辑', icon: 'edit', type: 'modal',
          modal: {
            component: UserModalComponent, params: (record) => ({ record, title: '编辑用户' }),
            // SysUserEditComponent的this.modal.close(next.msg)会返回一个值到这来;
          },
          click: (record, modal) => { this.message.success(modal); this.refresh(); }
        },
        {
          text: '角色', icon: 'team', type: 'drawer', drawer: {
            component: UserRoleComponent, size: 300
          }
        },
        {
          text: '删除', icon: 'delete', type: 'del', click: (record) => {
            this.sysUserService.delete(record.id).subscribe((res) => {
              this.message.success(res.msg);
              this.refresh();
            });
          }
        }
      ]
    }
  ];

  constructor(
    private sysUserService: SysUserService, private modal: ModalHelper,
    private message: NzMessageService) {
  }


  ngOnInit() {
    this.query();
  }

  // 查询数据
  query() {
    this.loading = true;
    this.q.page = 1;
    this.checkedIds = [];
    return this.sysUserService.findByPage(this.q).subscribe((result) => {
      this.data = result.data;
      this.q.page = result.data.number;
      this.q.size = result.data.size;
      this.loading = false;
    });
  }

  add() {
    this.modal.create(UserModalComponent, { title: '新增用户' }).subscribe((result) => {
      this.message.success(result.msg);
      this.refresh();
    });
  }

  // 刷新
  refresh() {
    this.sysUserService.findByPage(this.q).subscribe((result) => {
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
