import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Mail } from './../mail/mail';
import { MailService } from './../mail/mail.service';
import { CustomJavascriptService } from './../custom/custom-javascript.service';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  viewProviders: [CustomJavascriptService],
  providers: [MailService]
})
export class ContactComponent implements OnInit {
  public success: string;
  public error: string;
  public mail: Mail = new Mail();

  constructor(private route: ActivatedRoute,
    private jsService: CustomJavascriptService,
    private mailservice: MailService) { }

  ngOnInit() {
    this.jsService.appendToBody('./../../assets/scripts/jquery.gmaps.min.js');
    this.jsService.appendToBody('./../../assets/scripts/maprun.js');
    $('body').customMap();
  }

  public sendMail() {
    this.success = null;
    this.error = null;
    this.mail.toemail = "creative@hopnep.com";
    this.mailservice.send(this.mail).subscribe(
      data => {
        this.success = data.success;
        this.error = data.error;
      }
    );
  }

}
