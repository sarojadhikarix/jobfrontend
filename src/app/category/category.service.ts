import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from './../HttpClient';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) { }
    /**
     * Gets the list of all articles
     */
    public getCategories() {
        return this.http.get(environment.apiRoute + 'categories')
            .map(res => res.json().data);
    }

    public getCategory(id){
        return this.http.get(environment.apiRoute + 'categories/' + id )
            .map(res => res.json().data);
    }
}