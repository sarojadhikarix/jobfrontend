import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

import { UserService } from './../user/user.service';
import { Job } from './../job/job';
import { JobService } from './../job/job.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { error } from 'util';
import { UserInfo } from './../user/user';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-manage-applications',
  templateUrl: './manage-applications.component.html',
  styleUrls: ['./manage-applications.component.css'],
  providers: [JobService, UserService]
})
export class ManageApplicationsComponent implements OnInit {

  public userInfo: any;
  public success: string;
  public error: string;
  public jobs: Job[];
  router: Router;
  public job_id: string;
  public applicants: UserInfo[];
  picture_link_start: string = '';
  picture_link_end: string = '';
  picture_error: string = '';
  constructor(
    private app: AppComponent,
    private route: ActivatedRoute,
    _router: Router,
    private jobService: JobService,
    private userService: UserService
  ) { this.router = _router; }

  ngOnInit() {
    if(this.app.isLoggedIn == false){
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe(params => {
      this.job_id = (params['job-id']);
      if (this.job_id == 'none') {
        this.job_id = '';
      }
    });

    this.getUserInfo();
    this.getApplicants();
    this.picture_error = 'error.png';
    this.picture_link_start = environment.apiRoute + 'storage/propic/';
    this.picture_link_end = '_propic.png?' + new Date().getTime();
  }

  public updateLink() {
    this.picture_link_end = this.picture_error;
  }

  getApplicants() {
    this.error = '';
    this.jobService.getStatus(this.job_id, 0).subscribe(
      data => {
        this.applicants = data;
      },
      error => {
        this.error = error.data.status;
      }
    )
  }

  changejob(job_id) {
    this.job_id = job_id;
    this.getApplicants();
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
      }
    )
  }

}
