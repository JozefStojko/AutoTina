import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../shared/model/admin.model';
import { AdminService } from '../../shared/service/admin.service';
import { UserService } from '../../shared/service/user.service';
import { Location } from '@angular/common';


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
    public adminService: AdminService,
    private location: Location

       ) { }


  ngOnInit() {
    // this.resetForm();
    }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.admin = {
      UserName: '',
      Password: ''
    };
  }

  OnSubmit(userName, password) {
    console.log(userName, password);
    this.userService.userAuthentication(userName, password).subscribe((user: any) => {
     localStorage.setItem('userToken', user.access_token);
     this.userService.getUserClaims().subscribe((data: any) => {
     this.userClaims = data;
     this.userService.user = data;
     this.userService.user.Id = data.Id;
     console.log(this.userService.user);
     this.resetForm();
     if (!data.IsAdmin) {
      this.userService.setValue(true);
      localStorage.setItem('userName', data.UserName);
      this.router.navigate(['users/user-home']);
    } else {
      localStorage.removeItem('userToken');
     }
    });
   },
   (err: HttpErrorResponse) => {
     this.isLoginError = true;
   });
 }

 goBack() {
  this.location.back(); // <-- go back to previous location on cancel
}

 }
