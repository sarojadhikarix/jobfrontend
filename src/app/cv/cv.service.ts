import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from './../HttpClient';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';

import { HttpModule, XHRBackend, RequestOptions, BaseRequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from './../../environments/environment';

@Injectable()
export class CVservice {

    router: Router;

    constructor(private http: HttpClient,
        private app: AppComponent,
        _router: Router) {
        this.router = _router;
    }

    getCV(user_id) {
        return this.http.get(environment.apiRoute + 'cv/' + user_id)
            .map(res => res.json().data);
    }

    addCVfile(data: any) {
        let headers = new Headers;
        headers.delete('content-type');
        headers.set('Authorization', localStorage.getItem('authToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.apiRoute + 'cv/addfile', data, options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    deleteCVfile(user_id) {
        return this.http.delete(environment.apiRoute + 'cv/file/' + user_id)
            .map(res => res.json());
    }

    addCV(data) {
        return this.http.post(environment.apiRoute + 'cv/add', data)
            .map(res => res.json())
            .catch(this.handleError)
    }

    deleteCV(user_id) {
        return this.http.delete(environment.apiRoute + 'cv/' + user_id)
            .map(res => res.json());
    }

    updateCV(data) {
        return this.http.post(environment.apiRoute + 'cv/update', data)
            .map(res => res.json());
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }




}