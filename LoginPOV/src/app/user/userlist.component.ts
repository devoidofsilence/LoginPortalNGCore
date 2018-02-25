import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { AlertService, UserService } from '../_services/index';

@Component({
    selector: 'user-list',
    templateUrl: './userlist.component.html'
})

export class UserListComponent implements OnInit {
    //currentUser: User;
    users: User[] = [];

    constructor(private alertService: AlertService, private userService: UserService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        if (id != JSON.parse(localStorage.getItem('currentUser')).id) {
            this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
            this.alertService.success("User deleted");
        } else {
            this.alertService.error("Cannot delete oneself");
        }
    }

    editUser(user: any) {
        this.userService.update(user).subscribe(() => { this.loadAllUsers() });
    }

    approveUser(user: any) {
        if (user.id != JSON.parse(localStorage.getItem('currentUser')).id) {
            this.userService.approve(user).subscribe(() => {
                this.loadAllUsers(); 
                if (user.isApproved == false) {
                    this.alertService.success("User approved");
                } else {
                    this.alertService.success("User disapproved");
                }
            });
        } else {
            this.alertService.error("Cannot approve/disapprove oneself");
        }
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}