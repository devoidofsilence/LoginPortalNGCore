import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user.model';

@Component({
  selector: 'change-password',
  templateUrl: './changePassword.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  changePwdForm : FormGroup;
  oldPassword : AbstractControl;
  newPassword : AbstractControl;
  user : User;
  currentUser: User;
  newUserStored: any;
  constructor (fb : FormBuilder, private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
        this.changePwdForm = fb.group({
            'oldPassword' : ['', [Validators.required]],
            'newPassword' : ['', [Validators.required]]
          });
        this.oldPassword = this.changePwdForm.controls['oldPassword'];
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
        this.userService.update(user)
            .subscribe(
                data => {
                    if (user.id == this.currentUser.id) {
                        this.newUserStored = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            isApproved: user.isApproved,
                            token: JSON.parse(localStorage.getItem('currentUser')).token,
                        };
                        localStorage.setItem('currentUser', JSON.stringify(this.newUserStored));
                        // this.activate.emit('AdminStatusChanged');
                    }
                    this.alertService.success('User updated successfully', true);
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
