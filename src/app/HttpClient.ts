import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

@Injectable()
export class HttpClient extends Http {

    constructor (backend: XHRBackend, options: RequestOptions) {
        super(backend, options);
    }

    setAccessToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    setUserName(username: string): void {
        localStorage.setItem('username', username);
    }
    
    setRoleId(id: string){
      localStorage.setItem('role_id', id);
    }
    
    public deleteWithBody(url: string, data) {
      let options = new RequestOptions({ 
        body: data,
        method: RequestMethod.Delete
      });
        
      return this.delete(url, options);
    }
    
    public objectToRequestOptions(data) {
      let urlParams = new URLSearchParams();

      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          urlParams.set(property, data[property]); 
        }
      }

      return urlParams;
    }
}
