import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService, ModalOptionsForService, NzNotificationService } from 'ng-zorro-antd';
import { PageData } from '@shared/page-data';
import { PermissionModalComponent } from './modal/permission-modal.component';
import { SysPermissionService } from './shared/sys-permission.service';
@Component({
  selector: 'sys-permission',
  templateUrl: './permission.component.html',
})
export class PermissionComponent implements OnInit {
  // 选中的数据                                                                              
  checkedIds: number[] = [];

  // 表格数据                                                                                
  data: PageData<any> = {};

  // 查询加载中                                                                              
  loading = false;

  // 查询参数
  q: any = {
    name: '',
    page: 1
  };


  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: '标识', index: 'mark' },
    { title: '名称', index: 'name' },
    { title: 'scope', index: 'scope' },
    { title: 'url', index: 'url' },
    { title: 'method', index: 'method' },
    {
      title: '编辑',
      buttons: [
        {
          text: '编辑', icon: 'edit', type: 'modal',
          modal: {
            component: PermissionModalComponent, params: (record) => ({ record, title: '编辑' })
          },
          click: (record, modal) => { this.message.success(modal); this.refresh(); }
        },
        {
          text: '删除', icon: 'delete', type: 'del', click: (record) => {
            this.permissionService.delete(record.id).subscribe((res) => {
              this.message.success(res.msg);
              this.refresh();
            });
          }
        }
      ]
    }
  ];

  constructor(
    private permissionService: SysPermissionService, private modal: ModalHelper,
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
    return this.permissionService.findByPage(this.q).subscribe((result) => {
      this.data = result.data;
      this.q.page = result.data.number;
      this.q.size = result.data.size;
      this.loading = false;
    });
  }

  add() {
    this.modal.create(PermissionModalComponent, { title: '新增' }).subscribe((result) => {
      this.message.success(result.msg);
      this.refresh();
    });
  }

  // 刷新                                                                                    
  refresh() {
    this.permissionService.findByPage(this.q).subscribe((result) => {
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
    this.permissionService.deleteBatch(this.checkedIds).subscribe(result => {
      this.checkedIds = [];
      this.refresh();
    });
  }

}                                                                                            