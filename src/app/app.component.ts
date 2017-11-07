import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn = false;
  _token: string;

  constructor() {
  }

  ngOnInit() {
  }

  get showHeader(): boolean {
    this._token = sessionStorage.getItem('currentUser');
    if (this._token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

}
