import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelper } from '../common/http-helper/http-helper.class';
import { Observable } from 'rxjs';
import { AppSettings } from '../config/app.config';

export interface IGrant {
    _id: string;
    grantName: String;
    grantLink: string;
    type: string;
    singleDeliveryDate: {
        fundingExpiryDate: Date,
        completionDate: Date,
    };
    multipleMilestones: [{
        milestoneNumber: any,
        completionDate: Date
    }];
    grantManager: string;
    grantees: Array<string>;
    grantAmount: number;
    totalFund: number;
    currency: string;
    createdBy: string;
}

@Injectable()
export class GrantService extends HttpHelper {

    user: any;
    constructor(private http: HttpClient) {
        super();
        this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
    }

    createGrant(data: IGrant): Observable<any> {
        return this.http.post(this.apiUrl + '/grant', data, this.getHttpOptions());
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl + '/grant', this.getHttpOptions())
    }

    getGrantCreatedByMe(): Observable<any> {
        return this.http.get(this.apiUrl + '/grant/createdByMe/' + this.user._id, this.getHttpOptions());
    }

    getGrantFundedByMe(): Observable<any> {
        return this.http.get(this.apiUrl + '/grant/fundedByMe/' + this.user._id, this.getHttpOptions());
    }

    getGrantManagedByMe(): Observable<any> {
        return this.http.get(this.apiUrl + '/grant/managedByMe/' + this.user._id, this.getHttpOptions());
    }

}