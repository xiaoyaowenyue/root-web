import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeNodeOptions, NzModalRef, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysPermissionService } from 'app/service/sys-permission.service';
import { SysRoleService } from 'app/service/sys-role.service';
import { zip } from 'rxjs';
import { SysMenuService } from 'app/service/sys-menu.service';

@Component({
  selector: 'app-sys-role-add',
  templateUrl: './sys-role-add.component.html',
  styles: []
})
export class SysRoleAddComponent implements OnInit {
  @ViewChild('permissionTree')
  permissionTree: NzTreeComponent;
  @ViewChild('menuTree')
  menuTree: NzTreeComponent;

  record: any = {}
  validateForm: FormGroup;
  permissions: NzTreeNodeOptions[] = []
  menus: NzTreeNodeOptions[] = []


  constructor(private fb: FormBuilder, private ref: NzModalRef, private sysRoleService: SysRoleService,
    private permissionService: SysPermissionService,
    private menuService: SysMenuService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group(
      {
        name: [null, [Validators.required]],
      }
    );

    zip(
      this.permissionService.findRolePermissions("", "0"),
      this.menuService.findRoleMenus("", "0")
    ).subscribe(([permissionResult, menuResult]) => {
      this.permissions = permissionResult.data;
      this.menus = menuResult.data;
    }, err => {
      this.ref.destroy()
    })

    // this.permissionService.findRolePermissions("", "0").subscribe(res => {
    //   this.permissions = res.data;
    // }, error => {
    //   this.ref.destroy()
    // })
  }

  close() {
    this.ref.close();
  }

  get name() {
    return this.validateForm.controls.name;
  }

  submitForm(value: { name: string; }) {
    let checkedPermissions: NzTreeNode[] = this.permissionTree.getCheckedNodeList()
    let permissionIds: string[] = []
    // 选中的权限id
    checkedPermissions.forEach(v => this.extractIds(v, permissionIds))

    // 收集选中和半选中得菜单id
    let checkedMenus: NzTreeNode[] = this.menuTree.getCheckedNodeList();
    let menusIds: string[] = []
    checkedMenus.forEach(v => this.extractIds(v, menusIds));
    this.menuTree.getHalfCheckedNodeList().forEach(v => this.extractIds(v, menusIds));

    this.sysRoleService.add(value.name, permissionIds, menusIds).subscribe(res => {
      this.ref.close(res);
    }, err => {
      this.ref.destroy();
    })
  }

  // 抽取树形节点的id以及子节点的id
  private extractIds(node: NzTreeNode, ids: string[]) {
    ids.push(node.key);
    if (node.children.length > 0) {
      for (let n of node.children) {
        this.extractIds(n, ids);
      }
    }
  }

}
