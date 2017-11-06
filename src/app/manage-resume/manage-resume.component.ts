import { Component, OnInit } from '@angular/core';

import { CV } from './../cv/cv';
import { UserInfo } from './../user/user';
import { CVservice } from './../cv/cv.service';
import { UserService } from './../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-resume',
  templateUrl: './manage-resume.component.html',
  styleUrls: ['./manage-resume.component.css'],
  providers: [CVservice, UserService]
})
export class ManageResumeComponent implements OnInit {

  public cv: CV = new CV();
  public userInfo: UserInfo = new UserInfo();
  public success: string;
  public error: string;
  public message: string;
  public count: number;
  router: Router;

  constructor(
    _router: Router,
    private cvService: CVservice,
    private userService: UserService) {
    this.router = _router;
  }

  ngOnInit() {
    this.getUserInfo();

  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.getCV();
      }
    );
  }

  public getCV() {
    this.cvService.getCV(this.userInfo.id).subscribe(
      data => {
        this.cv = data;
        this.count = data.length;
      }
    );
  }

  public deleteCV() {
    this.cvService.deleteCV(this.userInfo.id).subscribe(
      data => {
        
      }
      
    );
    this.getCV();
  }

}

