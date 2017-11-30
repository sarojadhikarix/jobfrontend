import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { JobService } from './job.service';
import { Job } from './job';
import { UserService } from './../user/user.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [JobService, UserService]
})
export class JobComponent implements OnInit {

  public userInfo: any;
  public job_id: string;
  public job: Job;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.job_id = (params['job-id']);
    });

    this.getJob();
    this.getUserInfo();
  }

  getJob() {
    this.jobService.getJob(this.job_id).subscribe(
      data => {
        this.job = data
      }
    );
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
      }
    );
  }

}
