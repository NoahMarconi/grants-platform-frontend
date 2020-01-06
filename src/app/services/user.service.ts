import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelper } from '../common/http-helper/http-helper.class';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends HttpHelper {

    constructor(private http: HttpClient) {
        super();
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl + '/user/getAll', this.getHttpOptions());
    }

    searchUser(name: string): Observable<any> {
        return this.http.get(this.apiUrl + '/user/searchUser/search/' + name, this.getHttpOptions());
    }

}
