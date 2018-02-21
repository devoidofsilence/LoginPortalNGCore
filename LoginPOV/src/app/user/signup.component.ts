import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user.model';
import { PasswordValidation } from '../others/passwordValidation.validator';

@Component({
  selector: 'signup-root',
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
  loading = false;
  loginForm : FormGroup;
  firstname : AbstractControl;
  lastname : AbstractControl;
  username : AbstractControl;
  email : AbstractControl;
  isAdmin : AbstractControl;
  password : AbstractControl;
  retypePassword : AbstractControl;
  user : User;
  constructor (fb : FormBuilder, private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
    this.loginForm = fb.group({
      'firstname' : ['', Validators.required],
      'lastname' : ['', Validators.required],
      'username' : ['', Validators.required],
      'isAdmin' : [false],
      'email' : ['', [Validators.required,Validators.email]],
      'retypePassword' : ['', Validators.required],
      'password' : ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
    this.firstname = this.loginForm.controls['firstname'];
    this.lastname = this.loginForm.controls['lastname'];
    this.username = this.loginForm.controls['username'];
    this.email = this.loginForm.controls['email'];
    this.isAdmin = this.loginForm.controls['isAdmin'];
    this.password = this.loginForm.controls['password'];
    this.retypePassword = this.loginForm.controls['retypePassword'];
  }
  ngOnInit () {
    this.user = {
      id : 0,
      email : '',
      firstname : '',
      lastname : '',
      username : '',
      isApproved : false,
      isAdmin : false,
      password : ''
    }
  }
  onSubmit () : void {
    this.loading = true;
    console.log(this.user);
        this.userService.create(this.user)
            .subscribe(
                data => {
                    this.alertService.success('User registered successfully', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
  }
}
