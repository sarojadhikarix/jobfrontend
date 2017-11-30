import { Component, OnInit } from '@angular/core';

import { UserService } from './../user/user.service';
import { Job } from './../job/job';
import { JobService } from './../job/job.service';
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

  constructor(
    private jobService: JobService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
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
