import { Component, OnInit } from '@angular/core';

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
  public job: Job = new Job();
  constructor(
    private jobService: JobService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  add() {
    this.job.user_id = this.userInfo.id;
    if (this.job.title == '') {
      confirm('Please fill the title field.');
    } else if (this.job.description == '') {
      confirm('Please fill the description field.');
    } else if (this.job.category_id == null) {
      confirm('Please fill the category field.');
    } else if (this.job.company_name == '') {
      confirm('Please fill the company name field.');
    } else if (this.job.company_email == '') {
      confirm('Please fill the company email field.');
    } else if (this.job.company_phone == '') {
      confirm('Please fill the company phone field.');
    } else if (this.job.type == '') {
      confirm('Please fill the Job Type field.');
    } else if (this.job.finish == '') {
      confirm('Please fill the Closing Date field.');
    } else {
      this.jobService.add(this.job).subscribe(
        data => {
          confirm(data.message);
        });
    }
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

}
