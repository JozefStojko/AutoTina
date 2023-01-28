import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../shared/model/admin.model';
import { AdminService } from '../../shared/service/admin.service';
import { UserService } from '../../shared/service/user.service';
import { Location } from '@angular/common';
import { pipeBind1 } from '@angular/core/src/render3';


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
    this.userService.userAuthentication(userName, password).subscribe((user: any) => {
     localStorage.setItem('userToken', user.access_token);
     this.userService.getUserClaims().subscribe((data: any) => {
     this.userClaims = data;
     this.resetForm();
     if (!data.IsAdmin) {
      this.userService.user = data;

      this.userService.user = {
      Address: data.Address,
      City: data.City,
      Email: data.Email,
      FirstName: data.FirstName,
      Id: data.Id,
      LastName: data.LastName,
      Phone: data.Phone,
      UserName: data.UserName,
      ZipCode: data.ZipCode,
      PIB: data.PIB,
      CompanyName: data.CompanyName
    }
      
      this.userService.user.Id = data.Id;
      localStorage.setItem('userName', data.UserName);
      this.userService.setValue(true);
      this.router.navigate(['users/user-home']);
    } else {
      this.adminService.admin = data;
      this.adminService.admin.Id = data.Id;
      localStorage.setItem('adminName', data.UserName);
      this.adminService.setValue(true);
      this.router.navigate(['admin-products/list-products']);
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
