import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { UserService } from './../user/user.service';
import { AppComponent } from './../app.component';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [CustomJavascriptService],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  username: any;
  role_id: string = '';
  error: string = '';
  constructor(
    private jsService: CustomJavascriptService,
    private userService: UserService,
    private app: AppComponent) { }

  ngOnInit() {
    $('body').customJquery();
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
  }



  public logout() {
    this.userService.logout();
  }
}
