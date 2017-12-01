import { Component, OnInit } from '@angular/core';

import { UserService } from './../user/user.service';
import { Job } from './../job/job';
import { JobService } from './../job/job.service';
import { Router } from '@angular/router';
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

  constructor(
    _router: Router,
    private jobService: JobService,
    private userService: UserService
  ) {this.router = _router; }

  ngOnInit() {
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
      }
    )
  }

}
