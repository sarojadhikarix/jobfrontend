import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginData } from './login';
import { Register } from './register';
import { HttpClient } from './../HttpClient';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';

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

    public getUserInfo() {
        return this.http.get(environment.apiRoute + 'user')
            .map(res => res.json());
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}
