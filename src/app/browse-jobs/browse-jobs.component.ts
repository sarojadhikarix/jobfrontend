import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AppComponent } from './../app.component';
import { JobService } from './../job/job.service';
import { CategoryService } from './../category/category.service';
import { Job } from './../job/job';
import { Search } from './../search/search';
import { UserService } from './../user/user.service';
@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.css'],
  providers: [JobService, CategoryService, UserService]
})
export class BrowseJobsComponent implements OnInit {

  public userInfo: any;
  public type: string;
  public catid: string;
  public jobs: Job[];
  public count: number = 0;
  public categorytype: string;
  public search: Search = new Search;
  public numOfPages: number[];
  public sliceStart: number = 0;
  public sliceEnd: number = 4;
  public page: number;
  router: Router;
  constructor(
    private app: AppComponent,
    _router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private categoryService: CategoryService,
    private userService: UserService
  ) { this.router = _router; }

  ngOnInit() {
    if (this.app.isLoggedIn == true) {
      this.getUserInfo();
    }
    this.type = localStorage.getItem('type');
    if (this.type == '') {
      this.type = 'alljobs';
    }
    if (this.type == 'category') {
      this.catid = localStorage.getItem('catid');
      this.getJobsByCategory();
    } else if (this.type == 'alljobs') {
      this.getJobs(1);
    } else if (this.type == 'search') {
      this.search.keyword = localStorage.getItem('keyword');
      this.search.location = localStorage.getItem('location');
      this.searchJobs();
    }
    localStorage.setItem('type', '');
    localStorage.setItem('keyword', '');
    localStorage.setItem('location', '');
    localStorage.setItem('catid', '');

  }

  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        if (data.role_id == 2) {
          if (confirm("Employer not allowed. Create a new account as an employee.")) {
            this.router.navigateByUrl('/manage-jobs');
          }
        }
      }
    );
  }

  getJobsByCategory() {
    this.categoryService.getCategory(this.catid).subscribe(
      data => {
        this.jobs = data.jobs.data;
        this.count = data.jobs.data.length;
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
        this.categorytype = data.name;
      }
    );
  }

  getJobs(pn) {
    this.jobService.getJobs().subscribe(
      data => {
        this.jobs = data;
        this.count = data.length;
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
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
        this.page = Math.ceil(this.count / 4);
        this.numOfPages = new Array(this.page);
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
