import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _isLoggedIn: boolean = false;
  private _userPartyId: string = '';

  public supportedLangs: any[];

  constructor(private route: Router) { }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(newValue: boolean) {
    this._isLoggedIn = newValue;
  }

  get userPartyId() {
    return this._userPartyId;
  }

  set userPartyId(newValue: string) {
    this._userPartyId = newValue;
  }

  public isLogin() {
    return false;
  }
}
