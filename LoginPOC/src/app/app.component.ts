import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { LoginUser } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginForm : FormGroup;
  username : AbstractControl;
  password : AbstractControl;
  user : LoginUser;
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
