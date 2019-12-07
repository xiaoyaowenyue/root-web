import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '@shared/result';
import { _HttpClient } from '@delon/theme';
import { UserVO } from './user.vo';
import { PageData } from '@shared/page-data';

@Injectable({
  providedIn: 'root'
})
export class SysUserService {

  url = '/api/v1/sysUsers';

  constructor(private http: _HttpClient) { }

  // 获取用户
  findByPage(params?: any): Observable<Result<PageData<UserVO>>> {
    return this.http.get<Result<PageData<UserVO>>>(this.url, params);
  }

  // 获取用户角色
  findSysUserRoles(userId: string): Observable<Result<any>> {
    return this.http.get(`${this.url}/${userId}/sysRoles`);
  }


  // 保存用户
  add(value: any) {
    return this.http.post(`${this.url}`, value);
  }

  // 修改用户
  update(sysUser: any): Observable<Result<any>> {
    return this.http.put(`${this.url}/${sysUser.id}`, sysUser);
  }

  // 用户绑定角色
  updateSysUserRoles(userId: string, roleIds: string[]): Observable<Result<any>> {
    return this.http.post(`${this.url}/${userId}/sysRoles`, roleIds);
  }

  // 删除用户
  delete(userId: string): Observable<Result<any>> {
    return this.http.delete(`${this.url}/${userId}`);
  }

  // 批量删除
  deleteBatch(userIds: string[]) {
    return this.http.delete(`${this.url}`, { ids: userIds });
  }

}
