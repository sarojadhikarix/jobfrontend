import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from './../HttpClient';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class MailService {
    constructor(private http: HttpClient) { }

    public send(data) {
        return this.http.post(environment.apiRoute + 'sendmail', data)
            .map(res => res.json().data);
    }
}