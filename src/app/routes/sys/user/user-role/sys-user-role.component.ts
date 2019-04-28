import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SysRoleService } from 'app/service/sys-role.service';
import { SysUserService } from 'app/service/sys-user.service';
import { zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { resolve } from 'q';

@Component({
  selector: 'app-sys-user-role',
  templateUrl: './sys-user-role.component.html',
})
export class SysUserRoleComponent implements OnInit {
  record: any = {};

  roles = [];
  allChecked = true;

  constructor(
    private ref: NzDrawerRef,
    public msgSrv: NzMessageService,
    private sysRoleService: SysRoleService,
    private sysUserService: SysUserService
  ) { }

  ngOnInit(): void {
    zip(
      this.sysRoleService.getAll(),
      this.sysUserService.getSysUserRoles(this.record.id)
    ).subscribe(([sysRoleResult, sysUserRoleResult]) => {
      for (let i of sysRoleResult.data) {
        for (let j of sysUserRoleResult.data) {
          if (i.id === j.id) {
            i.checked = true;
            break;
          }
        }
        if (i.checked) {
          this.roles.push({ label: i.name, value: i.id, checked: true });
        } else {
          this.allChecked = false;
          this.roles.push({ label: i.name, value: i.id, checked: false });
        }
      };
    });

  }

  //保存
  save() {
    let roleIds:string[] = this.roles.filter(item=>item.checked).map(item=>{
      return item.value;
    });
    this.sysUserService.postSysUserRoles(this.record.id, roleIds).subscribe(next => {
      this.ref.close("保存成功");
    });
  }

  // 全选按钮
  updateAllChecked(): void {
    if (this.allChecked) {
      this.roles = this.roles.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.roles = this.roles.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  // 多选按钮
  updateSingleChecked() {
    if (this.roles.every(item => item.checked === false)) {
      this.allChecked = false;
    } else if (this.roles.every(item => item.checked === true)) {
      this.allChecked = true;
    } else {
      this.allChecked = false;
    }
  }

  //关闭
  close() {
    this.ref.close();
  }
}
