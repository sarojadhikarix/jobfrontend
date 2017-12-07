import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { JobService } from './../job/job.service';
import { Job } from './../job/job';
import { UserService } from './../user/user.service';
import { JobStatus } from './../job/jobstatus';
@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css'],
  providers: [JobService, UserService]
})
export class AppliedjobsComponent implements OnInit {
  public applied: string = '';
  public success: string = '';
  public error: string = '';
  public jobstatus: JobStatus[];
  public userInfo: any;
  public jobs: Job[];
  public statuscount: number;
  public numOfPages: number[];
  public sliceStart: number = 0;
  public sliceEnd: number = 4;
  public page: number;
  public count: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        this.getUserJobs();
      }
    );
  }

  getUserJobs() {
    this.jobService.getStatus(0, this.userInfo.id).subscribe(
      data => {
        this.jobs = data;
        this.count = data.length;
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
      },
      error => {
        this.applied = error.data.status;
      }
    );
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
