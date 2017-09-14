import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from './../HttpClient';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class JobService {
    constructor(private http: HttpClient) { }
    /**
     * Gets the list of all articles
     */
    public getJobs() {
        return this.http.get(environment.apiRoute + 'jobs')
            .map(res => res.json().data);
    }

    public getJob(id) {
        return this.http.get(environment.apiRoute + 'jobs/' + id)
            .map(res => res.json().data)
    }

    public add(job) {
        return this.http.post(environment.apiRoute + 'jobs', job)
            .map(res => res.json().data);
    }

    public getJobsSortBy(sortby) {
        return this.http.get(environment.apiRoute + 'jobs/sort-by/' + sortby)
            .map(res => res.json().data);
    }

    public searchJobs(data) {
        return this.http.post(environment.apiRoute + 'search', data)
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}