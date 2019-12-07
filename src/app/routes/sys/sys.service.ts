import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { Result } from '@shared/result';
import { UserVO } from 'app/routes/sys/user/shared/user.vo';

@Injectable({
  providedIn: 'root'
})
export class SysService {
  url = '/api/v1/sys';

  constructor(private http: _HttpClient) { }

  findUserInfo(): Observable<Result<UserVO>> {
    return this.http.get(this.url + '/userInfo');
  }

  findMenus(): Observable<Result<any>> {
    return this.http.get(this.url + '/menus');
  }

  // 修改密码
  updatePassword(password: string): Observable<Result<any>> {
    return this.http.put(`${this.url}/password`, { password });
  }

}
