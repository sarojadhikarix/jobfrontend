import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

import { UserService } from './../user/user.service';
import { AdminJob } from './../job/adminjob';
import { JobService } from './../job/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  providers: [JobService, UserService]
})
export class AdminpanelComponent implements OnInit {

  public userInfo: any;
  public success: string;
  public error: string;
  public jobs: AdminJob[];
  public count: number;
  public numOfPages: number[];
  public sliceStart: number = 0;
  public sliceEnd: number = 10;
  public page: number;
  router: Router;
  constructor(
    private app: AppComponent,
    _router: Router,
    private jobService: JobService,
    private userService: UserService
  ) { this.router = _router;}

  ngOnInit() {
    if(this.app.isLoggedIn == false){
      this.router.navigateByUrl('/login');
    }
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        if (data.role_id != 3) {
          if (confirm("You need to be an Admin :-).")) {
            this.router.navigateByUrl('/login');
          }
        }
        this.getAllJobs();
      }
    );
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
      data => {
        this.jobs = data;
        this.count = data.length;
        this.page = Math.ceil(this.count / 10);
        this.numOfPages = new Array(this.page);
      }
    )
  }


  public changePage(i) {
    this.sliceStart = i * 10;
    this.sliceEnd = this.sliceStart + 10;
    for (let x = 0; x <= this.page; x++) {
      if (i == x) {
        document.getElementById('pagination' + i).className += " current-page";
      } else {
        document.getElementById('pagination' + x).classList.remove("current-page");
      }
    }
  }

  markFilled(id) {
    for (let i = 0; i <= this.jobs.length; i++) {
      if (this.jobs[i].id == id) {
        this.jobs[i].filled = true;
        this.jobService.update(this.jobs[i]).subscribe(
          data => {
            this.success = data.message;
            this.getAllJobs();
          },
          error => this.handleError(error)
        );
      }
    }
  }

  markNotFilled(id) {
    for (let i = 0; i <= this.jobs.length; i++) {
      if (this.jobs[i].id == id) {
        this.jobs[i].filled = false;
        this.jobService.update(this.jobs[i]).subscribe(
          data => {
            this.success = data.message;
            this.getAllJobs();
          },
          error => this.handleError(error)
        );
      }
    }
  }


  markAllow(id) {
    for (let i = 0; i <= this.jobs.length; i++) {
      if (this.jobs[i].id == id) {
        this.jobs[i].status = true;
        this.jobService.update(this.jobs[i]).subscribe(
          data => {
            this.success = data.message;
            this.getAllJobs();
          },
          error => this.handleError(error)
        );
      }
    }
  }

  markBan(id) {
    for (let i = 0; i <= this.jobs.length; i++) {
      if (this.jobs[i].id == id) {
        this.jobs[i].status = false;
        this.jobService.update(this.jobs[i]).subscribe(
          data => {
            this.success = data.message;
            this.getAllJobs();
          },
          error => this.handleError(error)
        );
      }
    }
  }

  private handleError(error: any) {
    this.error = '';
    this.error = error;
  }

}
