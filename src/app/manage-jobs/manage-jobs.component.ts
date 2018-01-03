import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

import { UserService } from './../user/user.service';
import { Job } from './../job/job';
import { JobService } from './../job/job.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css'],
  providers: [JobService, UserService]
})
export class ManageJobsComponent implements OnInit {

  public userInfo: any;
  public success: string;
  public error: string;
  public jobs: Job[];
  public count: number;
  public numOfPages: number[];
  public sliceStart: number = 0;
  public sliceEnd: number = 4;
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
        if (data.role_id == 1) {
          if (confirm("Employee not allowed. Create a new account as an employer.")) {
            this.router.navigateByUrl('/manage-resume');
          }
        }
        this.getJobsByUser();
      }
    );
  }

  getJobsByUser() {
    this.jobService.getJobByUser(this.userInfo.id).subscribe(
      data => {
        this.jobs = data;
        this.count = data.length;
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
      }
    )
  }


  public changePage(i) {
    this.sliceStart = i * 4;
    this.sliceEnd = this.sliceStart + 4;
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
            this.getJobsByUser();
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
            this.getJobsByUser();
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
