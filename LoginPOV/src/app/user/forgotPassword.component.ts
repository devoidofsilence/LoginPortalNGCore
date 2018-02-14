import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { ResetPasswordUser } from '../_models/forgotPassword.model';

@Component({
  selector: 'reset-password',
  templateUrl: './forgotPassword.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  loginForm : FormGroup;
  email : AbstractControl;
  user : ResetPasswordUser;
  constructor (fb : FormBuilder) {
    this.loginForm = fb.group({
      'email' : ['', [Validators.required, Validators.email]]
    });
    this.email = this.loginForm.controls['email'];
  }
  ngOnInit () {
    this.user = {
      email : ''
    }
  }
  onSubmit (value : string) : void {
    console.log('You submitted value : ', value);
  }
}
