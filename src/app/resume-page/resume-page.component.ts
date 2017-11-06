import { Component, OnInit } from '@angular/core';

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

  public cvlink: string;
  public cv: CV;
  public userInfo: UserInfo;
  public mail: Mail = new Mail();
  public success: string;
  public error: string;
  picture_link: string = '';
  picture_error: string = '';
  constructor(
    private cvService: CVservice,
    private userService: UserService,
    private mailservice: MailService
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.picture_error = environment.apiRoute + 'storage/propic/error.png';
  }

  public updateLink() {
    this.picture_link = this.picture_error;
  }

  public getCV() {
    this.cvService.getCV(this.userInfo.id).subscribe(
      data => {
        this.cv = data;
        this.cvlink = environment.apiRoute + 'storage/cv/'+ this.userInfo.id +'_cv.pdf';
        this.picture_link = environment.apiRoute + 'storage/propic/' + this.userInfo.id + '_propic.png?' + new Date().getTime();
      }
    );
  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.getCV();
      }
    );
  }

  public sendMail() {
    this.success = null;
    this.error = null;
    this.mail.toemail = this.userInfo.email;
    this.mailservice.send(this.mail).subscribe(
      data => {
        this.success = data.success;
        this.error = data.error;
      }
    );
  }

}
