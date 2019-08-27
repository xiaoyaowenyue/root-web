import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SysRoleService } from 'app/service/sys-role.service';
import { SysUserService } from 'app/service/sys-user.service';
import { zip } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-sys-user-role',
  templateUrl: './sys-user-role.component.html',
})
export class SysUserRoleComponent implements OnInit {
  record: any = {};

  roles = [];
  allChecked = false;

  constructor(
    private ref: NzDrawerRef,
    public msgSrv: NzMessageService,
    private sysRoleService: SysRoleService,
    private sysUserService: SysUserService
  ) { }

  ngOnInit(): void {
    zip(
      this.sysRoleService.findAll(),
      this.sysUserService.findSysUserRoles(this.record.id)
    ).subscribe(([sysRoleResult, sysUserRoleResult]) => {
      let userRoleMap = new Map<string, any>();
      // 把用户拥有的角色映射成hashmap,避免使用双重for循环
      (sysUserRoleResult.data as Array<any>).forEach(value => {
        userRoleMap.set(value.id, value);
      });
      for (let item of sysRoleResult.data) {
        //判断用户是否拥有这个角色，如果拥有，那就打勾
        if (userRoleMap.get(item.id) != undefined) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        this.roles.push({ label: item.name, value: item.id, checked: item.checked });
      }
      if (sysRoleResult.data.length == sysUserRoleResult.data.length) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    });

  }

  // 保存
  save() {
    const roleIds: string[] = this.roles.filter(item => item.checked).map(item => {
      return item.value;
    });
    this.sysUserService.updateSysUserRoles(this.record.id, roleIds).subscribe(next => {
      this.ref.close('保存成功');
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

  // 关闭
  close() {
    this.ref.close();
  }
}
