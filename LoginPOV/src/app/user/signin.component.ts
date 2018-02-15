import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AlertService, AuthenticationService } from '../_services/index';
import { User } from '../_models/user.model';

@Component({
  selector: 'signin-root',
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
  loading = false;
  returnUrl: string;
  loginForm : FormGroup;
  username : AbstractControl;
  password : AbstractControl;
  user : User;
  constructor (fb : FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.loginForm = fb.group({
      'username' : ['', Validators.required],
      'password' : ['', Validators.required]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }
  ngOnInit () {
    this.user = {
      id : null,
      username : '',
      email : '',
      password : ''
    }
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit () : void {
    // console.log(this.user);
    this.user.username = this.username.value;
    this.user.password = this.password.value;
    this.loading = true;
        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(
                data => {
                    // console.log(this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log('show validation');
                    this.alertService.error('Check username/password');
                    this.loading = false;
                });
    }
  }
