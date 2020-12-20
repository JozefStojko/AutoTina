import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { Admin } from '../model/admin.model';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
    ) {}
    admin: Admin;
    isAdmin = 'false';

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null) {
      // this.toastr.success('Hello world!', 'Toastr fun!');
      return true;
    }
      this.router.navigate(['admin-products/list-products']);
      return false;
  }
}
