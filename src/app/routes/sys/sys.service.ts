import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { Result } from '@shared/result';
import { UserInfo } from 'app/routes/sys/user/shared/user-vo';
import { SysModule } from './sys.module';

/**
 * 获取系统用户基本信息、菜单
 */
@Injectable({
  providedIn: 'root'
})
export class SysService {
  url = '/auth/api/v1/sys';

  constructor(private http: _HttpClient) { }

  findUserInfo(): Observable<Result<UserInfo>> {
    return this.http.get(this.url + '/userInfo');
  }

  // 修改密码
  updatePassword(password: string): Observable<Result<any>> {
    return this.http.put(`${this.url}/password`, { password });
  }

}
