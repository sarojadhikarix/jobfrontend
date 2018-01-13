import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AppComponent } from './../app.component';
import { JobService } from './job.service';
import { Job } from './job';
import { UserService } from './../user/user.service';
import { JobStatus } from './jobstatus';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [JobService, UserService]
})
export class JobComponent implements OnInit {
  public applied: string = '';
  public success: string = '';
  public error: string = '';
  public jobstatus: JobStatus = new JobStatus();
  public userInfo: any;
  public job_id: string;
  public job: Job = new Job();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private userService: UserService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.job_id = (params['job-id']);
    });
    if (this.app.isLoggedIn == true) {
      this.getUserInfo();
    }
    this.getJob();


  }

  getJob() {
    this.jobService.getJob(this.job_id).subscribe(
      data => {
        this.job = data;
      }
    );
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.getStatus();
      }
    );
  }

  addStatus() {
    this.success = '';
    this.error = '';
    this.jobstatus.job_id = this.job.id;
    this.jobstatus.user_id = this.userInfo.id;
    this.jobstatus.status = 'New';
    this.jobService.addStatus(this.jobstatus).subscribe(
      data => {
        this.success = data.message;
        document.getElementById('applybutton').innerText = 'Applied';
      },
      error => {
        this.error = error.message;
      }
    )
  }

  getStatus() {
    this.applied = '';
    this.jobService.getStatus(this.job_id, this.userInfo.id).subscribe(
      data => {
        this.jobstatus = data;
      },
      error => {
        this.applied = error.data.status;
      }
    )
  }

}
