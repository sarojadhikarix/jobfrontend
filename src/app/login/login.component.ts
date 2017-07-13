import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { LoginData } from './../user/login';
import { Register } from './../user/register';
import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { AppComponent } from './../app.component';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  viewProviders: [CustomJavascriptService, UserService]
})
export class LoginComponent implements OnInit {

  username: string = '';
  loginData: LoginData = new LoginData();
  register: Register = new Register();
  error: string;
  router: Router;

  constructor(
    private jsService: CustomJavascriptService,
    _router: Router,
    private userService: UserService,
    private app: AppComponent) {
    this.router = _router;
  }

  ngOnInit() {
    if (this.app.isLoggedIn == false) {
      if (localStorage.getItem('authToken') != '') {
        this.app.isLoggedIn = true;
        this.router.navigateByUrl('/add-job');
      }
    }
  }

  public login(): void {
    this.error = '';
    this.userService.login(this.loginData).subscribe(
      data => {
        this.handleSuccess(data);
        error => this.handleError(error);
      });
  }

  public registerUser(): void {
    this.error = '';
    this.userService.register(this.register).subscribe(
      data => {
        error => this.error = error;
      }
    )
  }

  private handleSuccess(data: any) {
    this.userService.setAccessToken(data.token_type + ' ' + data.access_token);
    // this.app.userPartyId = data.PARTY_ID;
    this.app.isLoggedIn = true;
    this.getUserInfo();
    this.router.navigateByUrl('/add-job');
  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userService.setUserName(data.name);
        error => this.error = error.json().error;
      }
    );
  }

  private handleError(error: any) {
    this.error = error;
  }
}
