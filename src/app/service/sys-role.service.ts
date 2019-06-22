import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from '@core/common/result';

@Injectable({
  providedIn: 'root'
})
export class SysRoleService {


  constructor(private http: _HttpClient) { }

  url = '/api/v1/sysRoles';
  
  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getSysRoles(q: any): Observable<Result> {
    return this.http.get(this.url, q);
  }

  getAll(): Observable<Result> {
    return this.http.get(`${this.url}/list`);
  }

  deleteBatchByIds(checkedIds: string[]) {
    return this.http.delete(this.url, checkedIds);
  }

}
