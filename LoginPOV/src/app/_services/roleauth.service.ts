import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('currentUser')!=null && !JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}