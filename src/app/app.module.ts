import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions, BaseRequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from './HttpClient';
import {  TruncatePipe }   from './pipes/limit/limitto';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSecondaryComponent } from './header-secondary/header-secondary.component';
import { LoginComponent } from './login/login.component';
import { AddJobComponent } from './add-job/add-job.component';
import { JobComponent } from './job/job.component';
import { CategoryComponent } from './category/category.component';
import { BrowseCategoriesComponent } from './browse-categories/browse-categories.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { ContactComponent } from './contact/contact.component';
import { AddResumeComponent } from './add-resume/add-resume.component';
import { ResumePageComponent } from './resume-page/resume-page.component';
import { ManageResumeComponent } from './manage-resume/manage-resume.component';
import { JobAlertsComponent } from './job-alerts/job-alerts.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { BrowseResumeComponent } from './browse-resume/browse-resume.component';
import { UserAccountComponent } from './user-account/user-account.component';

export function httpClientFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpClient(backend, defaultOptions);
}

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  headers = new Headers({});
  merge(options?: RequestOptionsArgs): RequestOptions {
    var newOptions = super.merge(options);
    newOptions.headers.set('Authorization', localStorage.getItem('authToken'));
    //newOptions.headers.set('Accept', 'application/json');
    newOptions.headers.set('Content-Type', 'application/json');
    return newOptions;
  }
}
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'job/:job-id', component: JobComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-job/:todo', component: AddJobComponent },
  { path: 'browse-categories', component: BrowseCategoriesComponent },
  { path: 'browse-jobs', component: BrowseJobsComponent },
  { path: 'contact', component: ContactComponent },
  {path: 'add-resume', component: AddResumeComponent},
  {path: 'resume-page/:user_id/:email', component: ResumePageComponent},
  {path: 'manage-resume', component: ManageResumeComponent},
  {path: 'job-alerts', component: JobAlertsComponent},
  {path: 'manage-jobs', component: ManageJobsComponent},
  {path: 'manage-application', component: ManageApplicationsComponent},
  {path: 'browse-resume', component: BrowseResumeComponent},
  { path: '404', component: ErrorpageComponent },
  { path: 'user-account', component:UserAccountComponent},
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorpageComponent,
    HeaderComponent,
    FooterComponent,
    HeaderSecondaryComponent,
    LoginComponent,
    AddJobComponent,
    JobComponent,
    CategoryComponent,
    BrowseCategoriesComponent,
    TruncatePipe,
    BrowseJobsComponent,
    ContactComponent,
    AddResumeComponent,
    ResumePageComponent,
    ManageResumeComponent,
    JobAlertsComponent,
    ManageJobsComponent,
    ManageApplicationsComponent,
    BrowseResumeComponent,
    PdfViewerComponent,
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HttpClient,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions]
    },
    {
      provide: RequestOptions,
      useClass: DefaultRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
