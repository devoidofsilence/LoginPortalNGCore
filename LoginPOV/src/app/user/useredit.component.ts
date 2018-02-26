import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
  users: User[] = [];
  currentUser: User;
  newUserStored: any;
//   @Output() activate: EventEmitter<string> = new EventEmitter<string>();
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
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit () {
    this.route.params.subscribe((params)=>{
        this.getUser(this.route.snapshot.params['userid']);
      });
    this.userService.getAll().subscribe(users => { this.users = users; });
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
    if (this.users.filter(e=>e.isAdmin==true && e.isApproved==true).length == 1 && this.currentUser.isAdmin == true && user.isAdmin == false) {
        this.alertService.error("At least one approved admin is required");
    } else {
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
}
