import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from '@shared/result';

@Injectable({
  providedIn: 'root'
})
export class SysRoleService {

  constructor(private http: _HttpClient) { }

  url = '/api/v1/sysRoles';

  findByPage(q: any): Observable<Result<any>> {
    return this.http.get(this.url, q);
  }

  add(roleRequest: RoleRequest): Observable<Result<any>> {
    return this.http.post(`${this.url}`, roleRequest);
  }

  update(id: string, roleRequest: RoleRequest): Observable<Result<any>> {
    return this.http.put(`${this.url}/${id}`, roleRequest);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  findAll(): Observable<Result<any>> {
    return this.http.get(`${this.url}/list`);
  }

  deleteBatch(checkedIds: string[]) {
    return this.http.delete(this.url, { "ids": checkedIds });
  }

}

export interface RoleRequest {
  name: string;
  permissionIds: string[];
  menuIds: string[];
}
