import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from '@core/common/result';

@Injectable({
  providedIn: 'root'
})
export class SysRoleService {
  update(id: string, vo: { name: string, permissionIds: string[] }): Observable<Result> {
    return this.http.put(`${this.url}/${id}`, vo);
  }
  add(name: string, permissionIds: string[], menuIds: string[]): Observable<Result> {
    return this.http.post(`${this.url}`, { "name": name, "permissionIds": permissionIds, "menuIds": menuIds });
  }


  constructor(private http: _HttpClient) { }

  url = '/api/v1/sysRoles';

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  findSysRoles(q: any): Observable<Result> {
    return this.http.get(this.url, q);
  }

  findAll(): Observable<Result> {
    return this.http.get(`${this.url}/list`);
  }

  deleteBatch(checkedIds: string[]) {
    return this.http.delete(this.url, { "ids": checkedIds });
  }


}
