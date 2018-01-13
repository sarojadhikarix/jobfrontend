import { Component, OnInit } from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';

import { JobService } from './../job/job.service';
import { Job } from './../job/job';
import { CategoryService } from './../category/category.service';
import { Search } from './../search/search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JobService, CategoryService],
  viewProviders: [CustomJavascriptService]
})
export class HomeComponent implements OnInit {

  public jobs: Job[];
  public error: string = '';
  public categories: any;
  public endsoonjobs: Job[];
  public search: Search = new Search;
  public jobscount: number;
  router: Router;
  constructor(
    private jobService: JobService,
    private jsService: CustomJavascriptService,
    private categoryService: CategoryService,
    _router: Router
  ) {
    this.router = _router;
  }

  ngOnInit() {
    this.getJobs();
    this.getCategories();
    this.getJobsSortBy();
  }

  public getJobs() {
    this.jobService.getJobs().subscribe(
      data => {
        this.jobs = data;
        this.jobscount = this.jobs.length;
        error => this.error = error.json().error;

      }
    );
  }

  public getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      });
  }

  public getJobsSortBy() {
    this.jobService.getJobsSortBy('finish').subscribe(
      data => {
        this.endsoonjobs = data;
      }
    )
  }

  public searchJobs() {
    localStorage.setItem('type', this.search.type);
    localStorage.setItem('keyword', this.search.keyword);
    localStorage.setItem('location', this.search.location);
    this.router.navigateByUrl('/browse-jobs');
  }

  public showByCategory(id) {
    localStorage.setItem('type', 'category');
    localStorage.setItem('catid', id);
    this.router.navigateByUrl('/browse-jobs');
  }

  public showAll(){
    localStorage.setItem('type', 'alljobs');
    this.router.navigateByUrl('/browse-jobs');
  }
}
