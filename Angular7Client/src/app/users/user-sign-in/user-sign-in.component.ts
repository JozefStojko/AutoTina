import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../shared/model/admin.model';
import { AdminService } from '../../shared/service/admin.service';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.css']
})
export class UserSignInComponent implements OnInit {
  admin: Admin;
  isLoginError = false;
  userClaims: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private adminData: AdminService,
    public adminService: AdminService
       ) { }


  ngOnInit() {
    // this.resetForm();
    }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.admin = {
      AdminName: '',
      Password: ''
    };
  }

  OnSubmit(userName, password) {
    console.log(userName, password);
    this.userService.userAuthentication(userName, password).subscribe((user: any) => {
     localStorage.setItem('userToken', user.access_token);
     this.userService.getUserClaims().subscribe((data: any) => {
     this.userClaims = data;
     console.log(data);
     this.resetForm();
     if (data.IsAdmin) {
      // this.adminData.adminSignInFunction(data.UserName);
      // this.adminService.itsAdminSignIn = true;
      this.router.navigate(['users/admin-home']);
    } else {
      localStorage.removeItem('userToken');
     }
    });
   },
   (err: HttpErrorResponse) => {
     this.isLoginError = true;
   });
 }
 }
