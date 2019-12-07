import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from '@shared/result';

@Injectable({
    providedIn: 'root'
})
export class SysMenuService {

    constructor(private http: _HttpClient) { }

    url = '/api/v1/sysMenus';

    add(menu: SysMenu): Observable<Result<any>> {
        return this.http.post(this.url, menu);
    }

    update(menu: SysMenu): Observable<Result<any>> {
        return this.http.put(`${this.url}/${menu.id}`, menu);
    }

    delete(id: string): Observable<Result<any>> {
        return this.http.delete(`${this.url}/${id}`);
    }


    findAll(): Observable<Result<any>> {
        return this.http.get(`${this.url}/list`);
    }

    findByPage(params: any): Observable<Result<any>> {
        return this.http.get(`${this.url}`, params);
    }

    deleteBatch(checkedIds: string[]): Observable<Result<any>> {
        return this.http.delete(this.url, { ids: checkedIds });
    }

    /**
     * 查找角色拥有的菜单
     */
    findRoleMenus(roleId: string, pid: string): Observable<Result<any>> {
        return this.http.get(`${this.url}/tree`, { roleId, pid });
    }

    // 查找菜单选项
    findMenuOptions(id: string): Observable<Result<any>> {
        return this.http.get(`${this.url}/options/tree`, { id });
    }
    // 递归查找当前菜单的所有父级菜单
    findParentIds(id: string): Observable<Result<any>> {
        return this.http.get(`${this.url}/parents/id_list`, { id });
    }

}

export interface SysMenu {
    id: string;
    pid: string;
    text: string;
    icon?: string;
    link?: string;
}
