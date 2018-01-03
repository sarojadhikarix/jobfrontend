import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Mail } from './../mail/mail';
import { MailService } from './../mail/mail.service';
import { CV } from './../cv/cv';
import { UserInfo } from './../user/user';
import { CVservice } from './../cv/cv.service';
import { UserService } from './../user/user.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.css'],
  providers: [CVservice, UserService, MailService],
})
export class ResumePageComponent implements OnInit {

  public toemail: string;
  public user_id: string;
  public cvlink: string;
  public cv: CV = new CV;
  public userInfo: UserInfo = new UserInfo();
  public mail: Mail = new Mail();
  public success: string;
  public error: string;
  picture_link: string = '';
  picture_error: string = '';
  router: Router;
  constructor(
    private app: AppComponent,
    _router: Router,
    private route: ActivatedRoute,
    private cvService: CVservice,
    private userService: UserService,
    private mailservice: MailService
  ) {  this.router = _router; }

  ngOnInit() {    
    if(this.app.isLoggedIn == false){
    this.router.navigateByUrl('/login');
  }
    this.route.params.subscribe(params => {
      this.user_id = (params['user_id']);
      this.toemail = (params['email']);
    });

    if (this.user_id != 'myself') {
      this.getCV(this.user_id);
      this.getUserByID(this.user_id);
    } else {
      this.getUserInfo();
      if (this.userInfo.role_id == '2') {
        if (confirm("Employer not allowed. Create a new account as an employee.")) {
          this.router.navigateByUrl('/manage-jobs');
        }
      }
    }

    this.picture_error = environment.apiRoute + 'storage/propic/error.png';
  }


  public updateLink() {
    this.picture_link = this.picture_error;
  }

  public getUserByID(id){
    this.userService.getUserInfoByID(id).subscribe(
      data => {
        this.userInfo = data;
        this.toemail = data.email;
      }
    );
  }

  public getCV(user_id) {
    this.cvService.getCV(user_id).subscribe(
      data => {
        this.cv = data;
        this.cvlink = environment.apiRoute + 'storage/cv/' + user_id + '_cv.pdf';
        this.picture_link = environment.apiRoute + 'storage/propic/' + user_id + '_propic.png?' + new Date().getTime();
      }
    );
  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.toemail = data.email;
        this.getCV(this.userInfo.id);
      }
    );
  }

  public sendMail() {
    this.success = null;
    this.error = null;
    this.mail.toemail = this.toemail;
    this.mailservice.send(this.mail).subscribe(
      data => {
        this.success = data.success;
        this.error = data.error;
      }
    );
  }

}
