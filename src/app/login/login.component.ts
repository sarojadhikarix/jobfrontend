import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';
import { LoginData } from './../user/login';
import { Register } from './../user/register';
import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { AppComponent } from './../app.component';
import { ForgotPassword } from './../user/forgotpassword';
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
  registererror: any = null;
  forgotpassword: ForgotPassword = new ForgotPassword();

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
        this.router.navigateByUrl('/add-job/add');
      }
    }else{
        this.router.navigateByUrl('/add-job/add');
      }
  }

  public login(): void {
    this.error = '';
    this.userService.login(this.loginData).subscribe(
      data => {
        this.handleSuccess(data);
      },
      error => this.handleError(error.error)

    );
  }

  public registerUser(): void {
    this.registererror = null;
    if(this.register.role_id == 2){
      this.register.gender = '4';
    }
    this.userService.register(this.register).subscribe(
      () => {
      },
      error => {
        this.registererror = error;
        this.loginData.username = this.register.email;
        this.loginData.password = this.register.password;
        this.login();
      }
    )
  }

  private handleSuccess(data: any) {
    this.userService.setAccessToken(data.token_type + ' ' + data.access_token);
    // this.app.userPartyId = data.PARTY_ID;
    this.app.isLoggedIn = true;
    this.getUserInfo();
  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userService.setUserName(data.name);
        this.userService.setRoleId(data.role_id);
        error => this.error = error.json().error;
        this.navigateuser(data);
      }
    );
  }

  public navigateuser(data){
    if(data.role_id == "1"){
      this.router.navigateByUrl('/job-alerts');
    }else if(data.role_id == "2"){
      this.router.navigateByUrl('/manage-jobs');
    }
  }

  private handleError(error: any) {
    this.error = error;
  }

  public reset() {
    this.error = '';
  }

  public sendToken(){
    this.registererror = null;
    this.error = '';
    this.userService.sendToken(this.forgotpassword).subscribe(
      data => {
        if(data.status == true){
          this.forgotpassword.checktoken = true;
        }
      },
      error => {
        this.error = error.message;
        this.registererror = error;
      }
    );
  }

  public resetPassword(){
    this.registererror = null;
    this.error = '';
    this.userService.resetPassword(this.forgotpassword).subscribe(
      data => {
        if(data.status == true){
          this.loginData.username = this.forgotpassword.email;
          this.loginData.password = this.forgotpassword.password;
          this.login();
        }
      },
      error => {
        this.error = error.message;
        this.registererror = error;
      }
    );
  }

}
