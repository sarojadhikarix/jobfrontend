import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from './../user/user.service';
import { Job } from './../job/job';
import { JobService } from './../job/job.service';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
  providers: [JobService, UserService]
})
export class AddJobComponent implements OnInit {
  public userInfo: any;
  public joberror: any;
  public success: string;
  public error: string;
  public todo: string;
  public job: Job = new Job();
  router: Router;
  constructor(
    private route: ActivatedRoute,
    _router: Router,
    private jobService: JobService,
    private userService: UserService
  ) { this.router = _router; }

  ngOnInit() {
    this.getUserInfo();
    this.route.params.subscribe(params => {
      this.todo = (params['todo']);
    });

    if (this.todo != 'add') {
      this.getJob();
    }
  }

  getJob() {
    this.jobService.getJob(this.todo).subscribe(
      data => {
        this.job = data
      }
    );
  }

  update() {
        this.jobService.update(this.job).subscribe(
          data => {
            this.success = data.message;
            this.router.navigateByUrl('/manage-jobs');
          },
          error => this.handleError(error)
        );
      }
    
  

  add() {
    this.job.user_id = this.userInfo.id;
    this.jobService.add(this.job).subscribe(
      data => {
        this.success = data.message;
        confirm(data.message);
        this.router.navigateByUrl('/manage-jobs');
      },
      error => this.handleError(error)
    );
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.job.company_name = data.name;
        this.job.company_email = data.email;
      }
    );
  }

  private handleError(error: any) {
    this.joberror = null;
    this.error = '';
    if (error.title || error.description || error.category_id || error.company_name || error.company_email || error.company_phone || error.keywords || error.type || error.requirements || error.user_id || error.finish || error.city || error.country) {
      confirm('Please fill all the required fields.');
      this.joberror = error;
    } else {
      this.error = error;
      confirm(error.message);
    }
  }

}
