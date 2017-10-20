import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { UserService } from './../user/user.service';
import { AppComponent } from './../app.component';
import { environment } from './../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [CustomJavascriptService],
  providers: [ UserService]
})
export class HeaderComponent implements OnInit {

  username: any;
  role_id: string = '';
  error: string = '';
  matching_jobs: string = '';
  picture_link:string = '';
  picture_error: string = '';

  constructor(
    private jsService: CustomJavascriptService,
    private userService: UserService,
    private app: AppComponent) { }

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
