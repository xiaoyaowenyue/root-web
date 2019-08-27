import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysRoleService } from 'app/service/sys-role.service';
import { SysPermissionService } from 'app/service/sys-permission.service';

@Component({
  selector: 'app-sys-role-edit',
  templateUrl: './sys-role-edit.component.html',
})
export class SysRoleEditComponent implements OnInit {
  @ViewChild('nzTreeComponent')
  nzTreeComponent: NzTreeComponent;
  validateForm: FormGroup;
  record: any = {};
  permissions: NzTreeNode[] = [];

  constructor(
    private ref: NzModalRef,
    public http: _HttpClient,
    private fb: FormBuilder,
    private sysRoleService: SysRoleService,
    private sysPermissionService: SysPermissionService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.record.name, [Validators.required]],
    });
    this.sysPermissionService.findRolePermissions(this.record.id, "0").subscribe(res => {
      console.log(this.record.id)
      console.log(res.data)
      this.permissions = res.data
    }, err => {
      this.ref.destroy();
    })
  }

  get name() {
    return this.validateForm.controls.name;
  }

  save(value: any) {
    this.ref.close("success");
  }

  close() {
    this.ref.destroy();
  }

  submitForm(value: { name: string }) {
    let checkedPermissions: NzTreeNode[] = this.nzTreeComponent.getCheckedNodeList()
    let checkIds: string[] = []
    checkedPermissions.forEach(v => {
      this.extractIds(v, checkIds);
    })
    this.sysRoleService.update(this.record.id, { "name": value.name, "permissionIds": checkIds }).subscribe(res => {
      this.ref.close(res);
    }, err => {
      this.ref.destroy();
    })
  }

  private extractIds(node: NzTreeNode, ids: string[]) {
    ids.push(node.key);
    if (node.children.length > 0) {
      for (let n of node.children) {
        this.extractIds(n, ids);
      }
    }
  }

}
