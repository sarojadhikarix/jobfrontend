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
  error: string = '';
  constructor(
    private jsService: CustomJavascriptService,
    private userService: UserService,
    private app: AppComponent) { }

  ngOnInit() {
    $('body').customJquery();
    if (this.app.isLoggedIn == true) {
      this.username = localStorage.getItem('username');
    } else if (this.app.isLoggedIn == false) {
      if (localStorage.getItem('authToken') != '') {
        this.app.isLoggedIn = true;
        this.username = localStorage.getItem('username');
      }
    }
  }



  public logout() {
    this.userService.logout();
  }
}
