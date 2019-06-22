import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '@core/common/result';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class SysUserService {


  url = '/api/v1/sysUsers';

  constructor(private http: _HttpClient) { }

  // 获取用户
  getSysUsers(params?: any): Observable<Result> {
    return this.http.get<Result>(this.url, params);
  }

  // 获取用户角色
  getSysUserRoles(userId: string): Observable<Result> {
    return this.http.get(`${this.url}/${userId}/sysRoles`);
  }

  // 保存用户
  saveSysUser(value: any) {
    return this.http.post(`${this.url}`, value);
  }
  // 保存用户的角色状态
  postSysUserRoles(userId: string, roleIds: string[]): Observable<Result> {
    return this.http.post(`${this.url}/${userId}/sysRoles`, roleIds);
  }

  // 修改用户
  putSysUser(sysUser: any): Observable<Result> {
    return this.http.put(`${this.url}/${sysUser.id}`, sysUser);
  }

  // 删除用户
  delete(userId: string): Observable<Result> {
    return this.http.delete(`${this.url}/${userId}`);
  }

  // 批量删除
  deleteBatchByIds(userIds: string[]) {
    return this.http.delete(`${this.url}`, { ids: userIds });
  }

}
