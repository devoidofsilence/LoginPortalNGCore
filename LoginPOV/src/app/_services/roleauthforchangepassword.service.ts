import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoleGuardChangePasswordService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('currentUser')!=null && route.params['userid']!=JSON.parse(localStorage.getItem('currentUser')).id) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}