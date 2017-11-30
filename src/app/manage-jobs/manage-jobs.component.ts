import { Component, OnInit } from '@angular/core';

import { UserService } from './../user/user.service';
import { Job } from './../job/job';
import { JobService } from './../job/job.service';
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

}
