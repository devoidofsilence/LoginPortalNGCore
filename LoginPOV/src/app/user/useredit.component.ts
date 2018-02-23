import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user.model';

@Component({
  selector: 'useredit',
  templateUrl: './useredit.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
  loading = false;
  userEditForm : FormGroup;
  firstname : AbstractControl;
  lastname : AbstractControl;
  username : AbstractControl;
  email : AbstractControl;
  isAdmin : AbstractControl;
  user : User;
  currentUser: User;
  constructor (fb : FormBuilder, private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
        this.userEditForm = fb.group({
            'firstname' : ['', Validators.required],
            'lastname' : ['', Validators.required],
            'username' : ['', Validators.required],
            'isAdmin' : [false],
            'email' : ['', [Validators.required,Validators.email]]
          });
        this.firstname = this.userEditForm.controls['firstname'];
        this.lastname = this.userEditForm.controls['lastname'];
        this.username = this.userEditForm.controls['username'];
        this.email = this.userEditForm.controls['email'];
        this.isAdmin = this.userEditForm.controls['isAdmin'];
        // this.getUser(this.route.snapshot.params['userid']);
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
                    this.alertService.success('User updated successfully', true);
                    this.router.navigate(['/userlist']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
  }
}
