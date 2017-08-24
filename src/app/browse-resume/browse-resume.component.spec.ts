import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseResumeComponent } from './browse-resume.component';

describe('BrowseResumeComponent', () => {
  let component: BrowseResumeComponent;
  let fixture: ComponentFixture<BrowseResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
