import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { SignUpUser } from '../_models/signup.model';
import { PasswordValidation } from '../others/passwordValidation.validator';

@Component({
  selector: 'signup-root',
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
  loginForm : FormGroup;
  username : AbstractControl;
  email : AbstractControl;
  password : AbstractControl;
  retypePassword : AbstractControl;
  user : SignUpUser;
  constructor (fb : FormBuilder) {
    this.loginForm = fb.group({
      'username' : ['', Validators.required],
      'email' : ['', [Validators.required,Validators.email]],
      'retypePassword' : ['', Validators.required],
      'password' : ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
    this.username = this.loginForm.controls['username'];
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
    this.retypePassword = this.loginForm.controls['retypePassword'];
  }
  ngOnInit () {
    this.user = {
      username : '',
      email : '',
      password : '',
      retypePassword : ''
    }
  }
  onSubmit (value : string) : void {
    console.log('You submitted value : ', value);
  }
}
