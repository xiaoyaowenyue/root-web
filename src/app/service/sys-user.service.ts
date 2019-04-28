import { Injectable } from '@angular/core';
import { SysUser } from 'app/model/sys-user';
import { Observable } from 'rxjs';
import { Result } from '@core/common/result';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class SysUserService {
  url: string = "/api/v1/sysUsers";

  constructor(private http: _HttpClient) { }

  getSysUsers(params?: any): Observable<Result> {
    return this.http.get<Result>(this.url, params);
  }

  getSysUserRoles(userId: string): Observable<Result> {
    return this.http.get(`${this.url}/${userId}/sysRoles`);
  }
  //保存用户的角色状态
  postSysUserRoles(userId: string, roleIds: string[]) {
    return this.http.post(`${this.url}/${userId}/sysRoles`, roleIds );
  }

}
