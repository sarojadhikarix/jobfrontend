import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params  } from '@angular/router';
@Component({
  selector: 'app-browse-categories',
  templateUrl: './browse-categories.component.html',
  styleUrls: ['./browse-categories.component.css']
})
export class BrowseCategoriesComponent implements OnInit {

  router: Router;

  constructor(_router: Router,
    private route: ActivatedRoute) {
    this.router = _router;
  }

  ngOnInit() {
  }

  searchJobs(keyword){
    localStorage.setItem('type', 'search');
    localStorage.setItem('keyword', keyword);
    this.router.navigateByUrl('/browse-jobs');
  }

}
