import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user.model';
import { PasswordValidation } from '../others/passwordValidation.validator';

@Component({
  selector: 'change-password',
  templateUrl: './changePassword.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  changePwdForm : FormGroup;
//   oldPassword : AbstractControl;
  password : AbstractControl;
  retypePassword : AbstractControl;
  user : User;
  currentUser: User;
  newUserStored: any;
  constructor (fb : FormBuilder, private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
        this.changePwdForm = fb.group({
            // 'oldPassword' : ['', [Validators.required]],
            'retypePassword' : ['', [Validators.required]],
            'password' : ['', [Validators.required]]
          }
          , {
            validator: PasswordValidation.MatchPassword // your validation method
          });
        // this.oldPassword = this.changePwdForm.controls['oldPassword'];
        this.password = this.changePwdForm.controls['password'];
        this.retypePassword = this.changePwdForm.controls['retypePassword'];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit () {
    this.route.params.subscribe((params)=>{
        this.getUser(this.route.snapshot.params['userid']);
      });
  }

  getUser(id) {
    this.userService.getById(id)
            .subscribe(
                data => {
                    this.user = data
                }
            );
  }

  onSubmit (user) : void {
    this.loading = true;
        this.userService.changePassword(user)
            .subscribe(
                data => {
                    this.alertService.success('Password updated successfully', true);
                    if (JSON.parse(localStorage.getItem('currentUser')).isAdmin == true) {
                        this.router.navigate(['/userlist']);
                    }
                    else {
                        this.router.navigate(['/home']);
                    }
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
  }
}
