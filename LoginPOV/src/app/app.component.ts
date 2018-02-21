import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './_models/index';
import { AuthenticationService } from './_services/index';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  currentUser: User;
  constructor(private authenticationService: AuthenticationService) {
    this.isLoggedIn = authenticationService.isLoggedIn();
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}
  ngOnInit () {

  }
}
