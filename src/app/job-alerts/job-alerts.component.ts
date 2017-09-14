import { Component, OnInit } from '@angular/core';

import { CV } from './../cv/cv';
import { UserInfo } from './../user/user';
import { CVservice } from './../cv/cv.service';
import { UserService } from './../user/user.service';
import { Router } from '@angular/router';
import { JobService } from './../job/job.service';
import { Job } from './../job/job';
import { Search } from './../search/search';

@Component({
  selector: 'app-job-alerts',
  templateUrl: './job-alerts.component.html',
  styleUrls: ['./job-alerts.component.css'],
  providers: [CVservice, UserService, JobService]
})
export class JobAlertsComponent implements OnInit {

  public cv: CV = new CV();
  public userInfo: UserInfo = new UserInfo();
  public success: string;
  public error: string = "";
  public count: number;
  router: Router;
  public jobs: Job[];
  public search: Search = new Search;
  public numOfPages: number[];
  public sliceStart: number = 0;
  public sliceEnd: number = 4;
  public page: number;

  constructor(
    private jobService: JobService,
    _router: Router,
    private cvService: CVservice,
    private userService: UserService) {
    this.router = _router;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.getCV();
      }
    );
  }

  public getCV() {
    this.cvService.getCV(this.userInfo.id).subscribe(
      data => {
        if (data.status == 'not_found') {
          this.error = "You have not added your CV. Go to Add Resume, to get alerts of jobs.";
        } else {
          this.cv = data;
          this.search.keyword = data.skills;
          this.searchJobs();
        }
      }
    );
  }

  searchJobs() {
    this.jobs = null;
    this.count = 0;
    this.jobService.searchJobs(this.search).subscribe(
      data => {
        this.jobs = data;
        this.count = data.length;
        localStorage.setItem('matching_jobs', data.length);
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
      },
      error => {
        this.error = "No alerts."
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
