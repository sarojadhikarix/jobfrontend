import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAlertsComponent } from './job-alerts.component';

describe('JobAlertsComponent', () => {
  let component: JobAlertsComponent;
  let fixture: ComponentFixture<JobAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
