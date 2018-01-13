import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { UserService } from './../user/user.service';
import { AppComponent } from './../app.component';
import { environment } from './../../environments/environment';
import { UserInfo } from './../user/user';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [CustomJavascriptService],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  public new_applicant: string = '';
  username: any;
  role_id: string = '';
  error: string = '';
  matching_jobs: string = '';
  picture_link: string = '';
  picture_error: string = '';
  public userInfo: UserInfo = new UserInfo();

  constructor(
    private jsService: CustomJavascriptService,
    private userService: UserService,
    private app: AppComponent) { }

  ngOnInit() {
//      this.jsService.appendToBody('./../../assets/scripts/custom.js');
    $('body').customJquery(); 
    if (this.app.isLoggedIn == true) {
      this.getUserInfo();
    }
    this.picture_error = environment.apiRoute + 'storage/propic/error.png';
    this.matching_jobs = localStorage.getItem('matching_jobs');
  }

  public logout() {
    this.userService.logout();
  }
  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.checkAll(data);
      }
    );
  }

  public checkAll(data) {
    if (this.app.isLoggedIn == false) {
      if (localStorage.getItem('authToken') != '') {
        this.app.isLoggedIn = true;
        this.username = data.name;
        this.role_id = data.role_id;
        this.picture_link = environment.apiRoute + 'storage/propic/' + data.id + '_propic.png?' + new Date().getTime();
      }
    } else {
      this.username = data.name;
      this.role_id = data.role_id;
      this.picture_link = environment.apiRoute + 'storage/propic/' + data.id + '_propic.png?' + new Date().getTime();
    }
  }
  public updateLink() {
    this.picture_link = this.picture_error;
  }

}