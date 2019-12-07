import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysMenuService, SysMenu } from 'app/routes/sys/menu/shared/sys-menu.service';
import { NzModalRef, CascaderOption, NzMessageService } from 'ng-zorro-antd';
import { zip } from 'rxjs';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styles: []
})
export class MenuModalComponent implements OnInit {

  validateForm: FormGroup;
  record: any = {}; // 固定写死
  title: string;

  constructor(private fb: FormBuilder, private menuService: SysMenuService,
              private ref: NzModalRef, private message: NzMessageService) { }

  // 级联菜单
  nzOptions: CascaderOption[] | null = null;
  disable = false;

  ngOnInit() {
    this.validateForm = this.fb.group(
      {
        parent: [null, [Validators.required]], // 菜单级别
        text: [this.record.text, [Validators.required]], // 菜单名
        link: [this.record.link], // 图标编号
        icon: [this.record.icon], // 链接
      }
    );

    // 获取传来的组件参数
    this.title = this.ref.getInstance().nzComponentParams.title;
    // 初始化级联菜单
    let id = this.record.id;
    if (id == undefined) {
      id = '0';
    }
    zip(
      this.menuService.findMenuOptions(id),
      this.menuService.findParentIds(id)
    ).subscribe(([options, parentLevel]) => {
      this.nzOptions = options.data;
      // 默认选中
      this.validateForm.controls.parent.setValue(parentLevel.data);
      if (this.record.id) {
        this.disable = true; // 编辑菜单时不允许修改父级菜单
      }
    });


  }

  submitForm(value) {
    if (this.parent.invalid) {
      this.parent.markAsDirty();
      this.parent.updateValueAndValidity();
      return;
    } else if (this.text.invalid) {
      this.text.markAsDirty();
      this.text.updateValueAndValidity();
      return;
    } else if (this.link.invalid) {
      this.link.markAsDirty();
      this.link.updateValueAndValidity();
      return;
    }

    const pid = value.parent[value.parent.length - 1];

    delete value.parent; // 删除对象属性
    // Object.assign相当于BeanUtils.copy，把后面对象的属性复制到第一个对象
    const menu: SysMenu = Object.assign({}, value, { pid });

    const id = this.record.id;
    if (id == undefined) { // 新增菜单
      this.menuService.add(menu).subscribe(result => {
        this.ref.destroy(result);
      });
    } else {
      menu.id = id;
      this.menuService.update(menu).subscribe(result => {
        this.ref.destroy(result);
      });
    }
  }

  get text() {
    return this.validateForm.controls.text;
  }
  get parent() {
    return this.validateForm.controls.parent;
  }
  get link() {
    return this.validateForm.controls.link;
  }

  get icon() {
    return this.validateForm.controls.icon;
  }

  close() {
    this.ref.close();
  }


}
