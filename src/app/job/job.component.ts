import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { JobService } from './job.service';
import { Job } from './job';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers:[JobService]
})
export class JobComponent implements OnInit {

  public job_id: string;
  public job: Job;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.job_id = (params['job-id']);
    });

    this.getJob();
  }

  getJob(){
    this.jobService.getJob(this.job_id).subscribe(
      data => {
        this.job = data
      }
    );
  }

}
