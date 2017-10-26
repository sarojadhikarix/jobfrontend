import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { AppComponent } from './../app.component';
import { UserService } from './../user/user.service';
import { environment } from './../../environments/environment';
import { UserInfo } from './../user/user';

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
  picture_link: string = '';
  picture_error: string = '';
  public userInfo: UserInfo = new UserInfo();

  constructor(
    private jsService: CustomJavascriptService,
    private app: AppComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    $('body').customJquery();
    this.getUserInfo();
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
    }
  }
  public updateLink() {
    this.picture_link = environment.apiRoute + 'storage/propic/error.png';
  }

}





