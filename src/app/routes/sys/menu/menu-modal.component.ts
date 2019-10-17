import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysMenuService } from 'app/service/sys-menu.service';
import { NzModalRef } from 'ng-zorro-antd';
import { CascaderOption } from 'ng-zorro-antd/cascader';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styles: []
})
export class MenuModalComponent implements OnInit {
  validateForm: FormGroup;
  record: any = {};
  title: string;

  constructor(private fb: FormBuilder, private menuService: SysMenuService, private ref: NzModalRef) { }

  // 级联菜单
  nzOptions: CascaderOption[] | null = null;
  // 默认选中的父级菜单
  defaultParent: string[] = ['0'];


  ngOnInit() {
    this.validateForm = this.fb.group(
      {
        parent: [this.defaultParent, [Validators.required]], // 菜单级别
        menuName: [null, [Validators.required]], //菜单名
        link: [null], //图标编号
        icon: [null], //链接
      }
    );

    // 获取传来的组件参数
    this.title = this.ref.getInstance().nzComponentParams.title;

    //初始化级联菜单
    this.menuService.findMenuOptions().subscribe(result => {
      this.nzOptions = result.data;
    })


  }

  submitForm(value) {
    if (this.parent.invalid) {
      this.parent.markAsDirty();
      this.parent.updateValueAndValidity();
      return;
    } else if (this.menuName.invalid) {
      this.menuName.markAsDirty();
      this.menuName.updateValueAndValidity();
      return;
    } else if (this.link.invalid) {
      this.link.markAsDirty();
      this.link.updateValueAndValidity();
      return;
    }
  }

  onChanges(values: string[]) {
    console.log(values);

  }

  get menuName() {
    return this.validateForm.controls.menuName;
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
