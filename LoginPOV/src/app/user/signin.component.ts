import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { SignInUser } from '../_models/signin.model';

@Component({
  selector: 'signin-root',
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
  loginForm : FormGroup;
  username : AbstractControl;
  password : AbstractControl;
  user : SignInUser;
  constructor (fb : FormBuilder) {
    this.loginForm = fb.group({
      'username' : ['', Validators.required],
      'password' : ['', Validators.required]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }
  ngOnInit () {
    this.user = {
      username : '',
      password : ''
    }
  }
  onSubmit (value : string) : void {
    console.log('You submitted value : ', value);
  }
}
