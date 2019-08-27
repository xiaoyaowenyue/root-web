import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeNodeOptions, NzModalRef, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysPermissionService } from 'app/service/sys-permission.service';
import { SysRoleService } from 'app/service/sys-role.service';
import { SysMenuService } from 'app/service/sys-menu.service';
import { zip, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

  }

  close() {
    this.ref.close();
  }

  get name() {
    return this.validateForm.controls.name;
  }

  submitForm(value: { name: string; }) {
    // 选中的权限id
    let permissionIds: string[] = [];
    this.permissionTree.getCheckedNodeList().forEach(node => this.extractIds(node, permissionIds));

    // 收集选中和半选中得菜单id
    let menuIds: string[] = []
    this.menuTree.getCheckedNodeList().forEach(node => this.extractIds(node, menuIds));
    this.menuTree.getHalfCheckedNodeList().forEach(node => this.extractIds(node, menuIds));
    console.log(menuIds);
    
    this.sysRoleService.add(value.name, permissionIds, menuIds).subscribe(res => {
      this.ref.close(res);
    }, err => {
      this.ref.destroy();
    })
  }

  // 抽取树形节点的id以及子节点的id
  private extractIds(node: NzTreeNode, ids: string[]) {
    ids.push(node.key);
    if (node.isAllChecked) {
      for (let n of node.children) {
        this.extractIds(n, ids);
      }
    }
  }

}
