import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysRoleService, RoleRequest } from 'app/routes/sys/role/shared/sys-role.service';
import { SysPermissionService } from 'app/routes/sys/permission/shared/sys-permission.service';
import { zip } from 'rxjs';
import { SysMenuService } from 'app/routes/sys/menu/shared/sys-menu.service';

@Component({
  selector: 'app-sys-role-edit',
  templateUrl: './sys-role-edit.component.html',
})
export class SysRoleEditComponent implements OnInit {
  @ViewChild('permissionTree', {static: true})
  permissionTree: NzTreeComponent;
  @ViewChild('menuTree', {static: true})
  menuTree: NzTreeComponent;
  validateForm: FormGroup;
  record: any = {};
  permissions: NzTreeNode[] = [];
  menus: NzTreeNode[] = [];

  constructor(
    private ref: NzModalRef,
    public http: _HttpClient,
    private fb: FormBuilder,
    private sysRoleService: SysRoleService,
    private permissionService: SysPermissionService,
    private menuService: SysMenuService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.record.name, [Validators.required]],
    });
    zip(
      this.permissionService.findRolePermissions(this.record.id, '0'),
      this.menuService.findRoleMenus(this.record.id, '0')
    ).subscribe(([permissionResult, menuResult]) => {
      this.permissions = permissionResult.data;
      this.menus = menuResult.data;
    }, err => {
      this.ref.destroy();
    });
  }

  get name() {
    return this.validateForm.controls.name;
  }

  save(value: any) {
    this.ref.close('success');
  }

  close() {
    this.ref.destroy();
  }

  submitForm(value: { name: string }) {
    // 选中的权限id
    const permissionIds: string[] = [];
    this.permissionTree.getCheckedNodeList().forEach(node => this.extractIds(node, permissionIds));

    // 收集选中和半选中得菜单id
    const menuIds: string[] = [];
    this.menuTree.getCheckedNodeList().forEach(node => this.extractIds(node, menuIds));
    this.menuTree.getHalfCheckedNodeList().forEach(node => this.extractIds(node, menuIds));

    const roleAddRequest: RoleRequest = { name: value.name, permissionIds, menuIds };
    this.sysRoleService.update(this.record.id, roleAddRequest).subscribe(res => {
      this.ref.close(res);
    }, err => {
      this.ref.destroy();
    });
  }

  private extractIds(node: NzTreeNode, ids: string[]) {
    ids.push(node.key);
    if (node.children.length > 0) {
      for (const n of node.children) {
        this.extractIds(n, ids);
      }
    }
  }

}
