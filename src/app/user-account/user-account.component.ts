import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { UserInfo } from './../user/user';
import { UserService } from './../user/user.service';
import { Router } from '@angular/router';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  providers: [UserService]
})
export class UserAccountComponent implements OnInit {

  public imagefilename: string = '';
  picture_link: string = '';
  picture_error: string = '';
  public userInfo: UserInfo = new UserInfo();
  public success: string;
  public error: string;
  public propicfilename: string;
  public propicfileerror: string;
  public propicerror: any = null;
  public returnedcvfilename: string;
  router: Router;
  constructor(
    private app: AppComponent,
    _router: Router,
    private elem: ElementRef,
    private userService: UserService
  ) { this.router = _router; }

  ngOnInit() {
    if(this.app.isLoggedIn == false){
      this.router.navigateByUrl('/login');
    }
    this.getUserInfo();
    
    this.picture_error = environment.apiRoute + 'storage/propic/error.png';
  }

  public updateLink() {
    this.picture_link = environment.apiRoute + 'storage/propic/error.png';
  }

  fileChangeEvent(event): void {
    this.propicerror = null;
    this.error = '';
    this.success = '';
    this.propicfileerror = '';
    let files = this.elem.nativeElement.querySelector('#propicfileinput').files;
    let formData = new FormData();
    let file = files[0];
    this.propicfilename = file.name;
    formData.append('propic', file, file.name);
    formData.append('user_id', (this.userInfo.id).toString());

    this.userService.addpropic(formData).subscribe(
      data => {
        if (data.success) {
          this.success = data.success;
          this.picture_link = environment.apiRoute + 'storage/propic/' + this.userInfo.id + '_propic.png?' + new Date().getTime();
        } else {
          this.error = data.error;
        }
      },
      error => this.handleError(error)
    );
  }

  private handleError(error: any) {
    console.log(error);
    this.propicerror = null;
    if (error.propic) {
      this.propicfileerror = error.propic[0];
    }
  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.picture_link = environment.apiRoute + 'storage/propic/' + this.userInfo.id + '_propic.png?' + new Date().getTime();
      }
    );
  }

}
