import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from '@core/common/result';

@Injectable({
  providedIn: 'root'
})
export class SysRoleService {

  url:string="/api/v1/sysRoles";
  constructor(private http:_HttpClient) { }

  getAll():Observable<Result>{
    return this.http.get(`${this.url}/list`);
  }

}
