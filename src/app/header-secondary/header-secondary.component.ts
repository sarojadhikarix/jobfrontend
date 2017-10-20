import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { AppComponent } from './../app.component';
import { UserService } from './../user/user.service';
import { environment } from './../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-header-secondary',
  templateUrl: './header-secondary.component.html',
  styleUrls: ['./header-secondary.component.css'],
  viewProviders: [CustomJavascriptService],
  providers: [UserService]
})
export class HeaderSecondaryComponent implements OnInit {

  username: string = '';
  error: string = '';
  role_id: string = '';
  matching_jobs: string = '';
  picture_link:string = '';
  picture_error: string = '';

  constructor(
    private jsService: CustomJavascriptService,
    private app: AppComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    $('body').customJquery();
    
    this.picture_link = environment.apiRoute + 'storage/propic/52_propic.png';
    this.picture_error = environment.apiRoute + 'storage/propic/error.png';
    if (this.app.isLoggedIn == false) {
      if (localStorage.getItem('authToken') != '') {
        this.app.isLoggedIn = true;
        this.username = localStorage.getItem('username');
        this.role_id = localStorage.getItem('role_id');
      }
    } else {
      this.username = localStorage.getItem('username');
      this.role_id = localStorage.getItem('role_id');
    }
    this.matching_jobs = localStorage.getItem('matching_jobs');
  }

  public logout() {
    this.userService.logout();
  }

  public updateLink(){
    this.picture_link = environment.apiRoute + 'storage/propic/error.png';
  }
}
