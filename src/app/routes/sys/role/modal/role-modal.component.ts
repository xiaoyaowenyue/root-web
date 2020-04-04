import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzTreeComponent, NzTreeNodeOptions, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysRoleService } from 'app/routes/sys/role/shared/sys-role.service';
import { zip } from 'rxjs';
import { SysMenuService } from 'app/routes/sys/menu/shared/sys-menu.service';
import { RoleRequest } from '../shared/role-request';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'sys-role-modal',
  templateUrl: './role-modal.component.html',
})
export class RoleModalComponent implements OnInit {
  @ViewChild('permissionTree', { static: true })
  permissionTree: NzTreeComponent;
  @ViewChild('menuTree', { static: true })
  menuTree: NzTreeComponent;
  formGroup: FormGroup;
  record: any = {}; // 从RoleComponent传过来
  title: string; // 从RoleComponent传过来
  permissions: NzTreeNodeOptions[] = [];
  menus: NzTreeNodeOptions[] = [];

  constructor(
    private ref: NzModalRef,
    public http: _HttpClient,
    private fb: FormBuilder,
    private sysRoleService: SysRoleService,
    private menuService: SysMenuService
  ) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      name: [this.record.name, [Validators.required]],
    });
    zip(
      this.sysRoleService.findRolePermissions(this.record.id),
      this.menuService.findRoleMenus(this.record.id)
    ).subscribe(([permissionResult, menuResult]) => {
      this.permissions = permissionResult.data;
      this.menus = menuResult.data;
    }, err => {
      this.ref.destroy();
    });
  }

  get name() {
    return this.formGroup.controls.name;
  }


  close() {
    this.ref.destroy();
  }

  submitForm(value: { name: string }) {
    // 选中的权限id
    const permissionIds: string[] = [];
    this.permissionTree.getCheckedNodeList().forEach(node => this.extractIds(node, permissionIds));

    // 收集选中和半选中的菜单id
    const menuIds: string[] = [];
    this.menuTree.getCheckedNodeList().forEach(node => this.extractIds(node, menuIds));
    this.menuTree.getHalfCheckedNodeList().forEach(node => this.extractIds(node, menuIds));

    const roleRequest: RoleRequest = { name: value.name, permissionIds, menuIds };
    if (this.record.id === undefined) {
      this.sysRoleService.add(roleRequest).subscribe(res => {
        this.ref.close(res);
      })
    } else {
      this.sysRoleService.update(this.record.id, roleRequest).subscribe(res => {
        this.ref.close(res);
      });
    }

  }

  private extractIds(node: NzTreeNodeOptions, ids: string[]) {
    ids.push(node.key);
    if (node.children.length > 0) {
      for (const n of node.children) {
        this.extractIds(n, ids);
      }
    }
  }

}
