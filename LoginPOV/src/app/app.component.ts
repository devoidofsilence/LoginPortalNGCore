import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, AfterContentChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './_models/index';
import { AuthenticationService } from './_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked, AfterContentChecked {
  isLoggedIn : Observable<boolean>;
  currentUser: User;
  isAdmin : Observable<boolean>;
  constructor(private authenticationService: AuthenticationService, private cdRef:ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.isLoggedIn = authenticationService.isLoggedIn();
    this.isAdmin = authenticationService.isAdmin();
  }
  
  ngOnInit () {

  }

  ngAfterContentChecked() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
