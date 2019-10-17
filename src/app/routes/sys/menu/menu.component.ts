import { Component, OnInit } from '@angular/core';
import { SysMenuService } from 'app/service/sys-menu.service';
import { STChange, STColumn } from '@delon/abc';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { Result } from '@core/common/result';
import { MenuModalComponent } from './menu-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  checkedIds: string[] = []

  q: any = {
    text: "",
    page: 1,
    size: 10
  }

  // 表格数据
  data: any = [];

  columns: STColumn[] = [
    { title: '编号', type: 'checkbox', index: 'id' },
    { title: 'id', index: 'id' },
    { title: '图标', render: "menu_icon" },
    { title: '菜单', index: 'text' },
    { title: '链接', index: 'link' },
    {
      title: '编辑',
      buttons: [
        {
          text: '编辑', icon: 'edit', type: 'modal',
          modal: {
            component: MenuModalComponent, params: (record) => {
              return { "record": record, "title": "编辑菜单" };
            }
          },
          // SysUserEditComponent的this.modal.close(next.msg)会返回一个值到这来;
          click: (record, modal) => { this.message.success(modal); this.refresh(); }
        },
        {
          text: '删除', icon: 'delete', type: 'del', click: (record) => {
            this.menuService.delete(record.id).subscribe((res) => {
              this.message.success(res.msg)
              this.query();
            });
          }
        }
      ]
    }
  ];


  constructor(private menuService: SysMenuService, private modal: ModalHelper,
    private message: NzMessageService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.query();
  }

  add() {
    this.modal.create(MenuModalComponent, { "title": "新增菜单" }).subscribe((result: Result) => {
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
    this.menuService.findByPage(this.q).subscribe((result: Result) => {
      this.data = result.data;
    });
  }

  query() {
    this.menuService.findByPage(this.q).subscribe(result => {
      this.data = result.data;
    });
  }

  deleteBatchIds() {
    this.menuService.deleteBatch(this.checkedIds).subscribe(res => {
      this.checkedIds = []
      this.query();
    })
  }

  onChange(ev: STChange) {
    if (ev.type === 'pi') {  // 换页操作
      this.q.page = ev.pi;
      this.q.size = ev.ps;
      this.query();
    }
    if (ev.type === 'checkbox') { // 选中操作
      this.checkedIds = [];
      ev.checkbox.forEach(item => {
        this.checkedIds.push(item.id);
      });
    }
  }

}
