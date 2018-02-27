import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { AlertService, UserService, ConfirmationDialogService } from '../_services/index';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

@Component({
    selector: 'user-list',
    templateUrl: './userlist.component.html'
})

export class UserListComponent implements OnInit {
    //currentUser: User;
    dtOptions: any = {};
    users: User[] = [];
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject();
    constructor(private alertService: AlertService, private userService: UserService, private confirmationDialogService: ConfirmationDialogService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            searching: false,
            lengthChange: false,
            responsive: true
          };
        this.loadAllUsers();
    }

    // deleteUser(id: number) {
    //     if (id != JSON.parse(localStorage.getItem('currentUser')).id) {
    //         this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    //         this.alertService.success("User deleted");
    //     } else {
    //         this.alertService.error("Cannot delete oneself");
    //     }
    // }

    editUser(user: any) {
        this.userService.update(user).subscribe(() => { this.loadAllUsers() });
    }

    approveUser(user: any) {
        this.confirmationDialogService.confirm('Confirmation', 'Change Approval Status ?')
        .then((confirmed) => {
            if (confirmed == true) {
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
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
            // Calling the DT trigger to manually render the table
            this.dtTrigger.next();
        });
    }

    public deleteUser(id : number) {
        this.confirmationDialogService.confirm('Confirmation', 'Confirm Delete ?')
        .then((confirmed) => {
            if (confirmed == true) {
                if (id != JSON.parse(localStorage.getItem('currentUser')).id) {
                    if (this.users.filter(e => e.isAdmin).length == 1) {
                        this.alertService.error("Cannot delete all admin");
                    } else {
                        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
                        this.alertService.success("User deleted");
                    }
                } else {
                    this.alertService.error("Cannot delete oneself");
                }
            }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      }
}