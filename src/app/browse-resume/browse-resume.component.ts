import { Component, OnInit } from '@angular/core';

import { Mail } from './../mail/mail';
import { MailService } from './../mail/mail.service';
import { CV } from './../cv/cv';
import { UserInfo } from './../user/user';
import { CVservice } from './../cv/cv.service';
import { UserService } from './../user/user.service';
import { environment } from './../../environments/environment';
import { Search } from './../search/search';
@Component({
  selector: 'app-browse-resume',
  templateUrl: './browse-resume.component.html',
  styleUrls: ['./browse-resume.component.css'],
  providers: [CVservice, UserService, MailService],
})
export class BrowseResumeComponent implements OnInit {

  public cvlink: string;
  public cvs: CV[];
  public userInfo: UserInfo;
  public mail: Mail = new Mail();
  public success: string;
  public error: string;
  picture_link: string = '';
  picture_error: string = '';
  public count: number = 0;
  public search: Search = new Search;
  public numOfPages: number[];
  public sliceStart: number = 0;
  public sliceEnd: number = 4;
  public page: number;
  constructor(
    private cvService: CVservice,
    private userService: UserService,
    private mailservice: MailService
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.searchCV();
    this.picture_error = environment.apiRoute + 'storage/propic/error.png';

  }

  public updateLink() {
    this.picture_link = this.picture_error;
  }

  searchCV() {
    this.cvs = null;
    this.count = 0;
    this.cvService.searchCV(this.search).subscribe(
      data => {
        this.cvs = data;
        this.count = data.length;
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
      }
    );

  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
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
