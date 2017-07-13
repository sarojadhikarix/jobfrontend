import { Component, OnInit} from '@angular/core';
import { CustomJavascriptService } from './../custom/custom-javascript.service';

import { JobService } from './../job/job.service';
import { Job } from './../job/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JobService],
  viewProviders: [CustomJavascriptService]
})
export class HomeComponent implements OnInit {

  public jobs: Job[];
  public error: string = '';

  constructor(
    private jobService: JobService,
    private jsService: CustomJavascriptService
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  public getJobs() {
    this.jobService.getJobs().subscribe(
      data => {
        this.jobs = data;
        error => this.error = error.json().error;

      }
    );

  }
}
