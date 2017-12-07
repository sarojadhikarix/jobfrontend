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

    public getJobByUser(id) {
        return this.http.get(environment.apiRoute + 'jobs/user/' + id)
            .map(res => res.json().data)
    }

    public add(job) {
        return this.http.post(environment.apiRoute + 'jobs', job)
            .map(res => res.json())
            .catch(this.handleError)
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

    public update(job) {
        return this.http.post(environment.apiRoute + 'jobs/update', job)
            .map(res => res.json())
            .catch(this.handleError)
    }

    public addStatus(stats) {
        return this.http.post(environment.apiRoute + 'jobs/addstatus', stats)
            .map(res => res.json())
            .catch(this.handleError)
    }

    public updateStatus(stats) {
        return this.http.post(environment.apiRoute + 'jobs/updatestatus', stats)
            .map(res => res.json())
            .catch(this.handleError)
    }

    public getStatus(job_id, user_id) {
        if(job_id == 0){
            job_id = '';
        }
        if(user_id == 0){
            user_id = '';
        }
        let data = {"job_id":job_id, "user_id":user_id};
        return this.http.post(environment.apiRoute + 'jobs/getstatus/', data)
            .map(res => res.json().data)
            .catch(this.handleError)
    }

}