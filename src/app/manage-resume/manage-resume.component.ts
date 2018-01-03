import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

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
    private app: AppComponent,
    _router: Router,
    private cvService: CVservice,
    private userService: UserService) {
    this.router = _router;
  }

  ngOnInit() {
    if(this.app.isLoggedIn == false){
      this.router.navigateByUrl('/login');
    }
    this.getUserInfo();

  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        if (data.role_id == 2) {
          if (confirm("Employer not allowed. Create a new account as an employee.")) {
            this.router.navigateByUrl('/manage-jobs');
          }
        }
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

