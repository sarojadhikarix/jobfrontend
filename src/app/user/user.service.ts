import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginData } from './login';
import { Register } from './register';
import { HttpClient } from './../HttpClient';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions, BaseRequestOptions, Headers, RequestOptionsArgs } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

    router: Router;

    constructor(private http: HttpClient,
        private app: AppComponent,
        _router: Router) {
        this.router = _router;
    }

    login(login: LoginData): Observable<LoginData> {
        return this.http.post(environment.apiRoute + 'oauth/token', login)
            .map(res => res.json() as LoginData)
            .catch(this.handleError)
    }

    logout() {
        this.app.isLoggedIn = false;
        this.setAccessToken('');
        this.setUserName('');
        this.setRoleId('');
        this.router.navigateByUrl('/');
    }


    register(register: Register): Observable<Register> {
        return this.http.post(environment.apiRoute + 'register', register)
            .map(res => res.json())
            .catch(this.handleError)
    }

    //   logout(): Observable<any> {
    //     return this.http.post(environment.apiRoute + this.userUrl + 'logout', {});
    //   }

    setAccessToken(token: string): void {
        this.http.setAccessToken(token);
    }

    setUserName(username: string): void {
        this.http.setUserName(username);
    }

    setRoleId(id: string) {
        this.http.setRoleId(id);
    }

    public getUserInfo() {
        return this.http.get(environment.apiRoute + 'user')
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }

    addpropic(data: any) {
        let headers = new Headers;
        headers.delete('content-type');
        headers.set('Authorization', localStorage.getItem('authToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.apiRoute + 'propic/add', data, options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    deleteCVfile(user_id) {
        return this.http.delete(environment.apiRoute + 'propic/' + user_id)
            .map(res => res.json());
    }
}
