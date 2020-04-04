import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from '@shared/result';

@Injectable({
    providedIn: 'root'
})
export class SysPermissionService {


    constructor(private http: _HttpClient) { }

    url = '/api/v1/sysPermissions';

    delete(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }

    findByPage(query: any) {
        return this.http.get(`${this.url}`, query);
    }


    findAll(): Observable<Result<any>> {
        return this.http.get(`${this.url}/list`);
    }

    deleteBatch(checkedIds: string[]) {
        return this.http.delete(this.url, checkedIds);
    }

}
