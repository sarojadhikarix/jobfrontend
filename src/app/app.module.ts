import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions, BaseRequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from './HttpClient';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { JoblistComponent } from './joblist/joblist.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSecondaryComponent } from './header-secondary/header-secondary.component';
import { LoginComponent } from './login/login.component';
import { AddJobComponent } from './add-job/add-job.component';
import { JobComponent } from './job/job.component';

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
  { path: 'browse-jobs', component: JoblistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: '404', component: ErrorpageComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorpageComponent,
    JoblistComponent,
    HeaderComponent,
    FooterComponent,
    HeaderSecondaryComponent,
    LoginComponent,
    AddJobComponent,
    JobComponent
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
