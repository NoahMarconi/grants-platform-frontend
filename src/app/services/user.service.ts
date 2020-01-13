import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelper } from '../common/http-helper/http-helper.class';
import { Observable } from 'rxjs';
import { AppSettings } from '../config/app.config';

@Injectable()
export class UserService extends HttpHelper {
    user: any;

    constructor(private http: HttpClient) {
        super();
        this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl + '/user/getAll', this.getHttpOptions());
    }

    uploadProfile(profile: any): Observable<any> {
        console.log("profile", profile);

        const formData = new FormData();
        formData.append('profile', profile);

        console.log("formData", formData);

        return this.http.post(this.apiUrl + '/user/uploadProfile/' + this.user._id, formData, this.getHttpOptions({ isJSONRequest: false }))
    }

    updateUser(data: any): Observable<any> {
        return this.http.put(this.apiUrl + '/user', data, this.getHttpOptions());
    }

    searchUser(name: string): Observable<any> {
        return this.http.get(this.apiUrl + '/user/searchUser/search/' + name, this.getHttpOptions());
    }

}
