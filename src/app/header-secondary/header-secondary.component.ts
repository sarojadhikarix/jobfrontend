import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { AppComponent } from './../app.component';
import { UserService } from './../user/user.service';

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
  constructor(
    private jsService: CustomJavascriptService,
    private app: AppComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    $('body').customJquery();
    if (this.app.isLoggedIn == true) {
      this.username = localStorage.getItem('username');
      this.role_id = localStorage.getItem('role_id');
    } else if (this.app.isLoggedIn == false) {
      if (localStorage.getItem('authToken') != '') {
        this.app.isLoggedIn = true;
        this.username = localStorage.getItem('username')
      }
    }
  }

  public logout() {
    this.userService.logout();
  }
}
