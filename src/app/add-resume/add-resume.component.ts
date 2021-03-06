
import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { CV } from './../cv/cv';
import { UserInfo } from './../user/user';
import { CVservice } from './../cv/cv.service';
import { UserService } from './../user/user.service';
import { Router } from '@angular/router';
import { AppComponent } from './../app.component';

declare var $: any;

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.css'],
  providers: [CVservice, UserService]
})
export class AddResumeComponent implements OnInit {

  public cv: CV = new CV();
  public userInfo: UserInfo = new UserInfo();
  public success: string;
  public error: string;
  public cvfilename: string;
  public returnedcvfilename: string;
  public cvfileerror: string;
  public cverror: any = null;
  router: Router;
  constructor(
    private app: AppComponent,
    _router: Router,
    private cvService: CVservice,
    private userService: UserService,
    private elem: ElementRef
  ) { this.router = _router; }


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
          if (confirm("Employer not allowed. Create a new account as an employee")) {
            this.router.navigateByUrl('/manage-jobs');
          }
        }
      }
    );
  }

  public add() {
    this.cv.user_id = this.userInfo.id;
    this.cv.cv_link = this.returnedcvfilename;
    this.cvService.addCV(this.cv).subscribe(
      data => {
        confirm(data.message);
        this.router.navigateByUrl('/manage-resume');
      },
      error => this.handleError(error)
    );
  }

  fileChangeEvent(event): void {
    this.cverror = null;
    this.error = '';
    this.success = '';
    this.cvfileerror = '';
    let files = this.elem.nativeElement.querySelector('#cvfileinput').files;
    let formData = new FormData();
    let file = files[0];
    this.cvfilename = file.name;
    formData.append('cv_file', file, file.name);
    formData.append('user_id', (this.userInfo.id).toString());

    this.cvService.addCVfile(formData).subscribe(
      data => {
        if (data.success) {
          this.success = data.success;
          this.returnedcvfilename = data.filename;
        } else {
          this.error = data.error;
        }
      },
      error => this.handleError(error)
    );
  }

  private handleError(error: any) {

    this.cverror = null;
    if (error.cv_file) {
      this.cvfileerror = error.cv_file[0];
    } else {
      this.cverror = error;
      if (error.user_id) {
        if (confirm("CV already exists. Go to update or delete sections for the changes.")) {
          this.router.navigateByUrl('/manage-resume');
        }
      }
    }
  }


}
