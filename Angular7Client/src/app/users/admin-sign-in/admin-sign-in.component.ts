import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { Admin } from '../../shared/model/admin.model';
import { AdminService } from '../../shared/service/admin.service';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css'],
  providers: [ Globals ]

})
export class AdminSignInComponent implements OnInit {

  admin: Admin;
  isLoginError = false;
  adminClaims: any;

  constructor(
    private userService: UserService,
    private router: Router,
    // private adminData: AdminService,
    public adminService: AdminService
       ) { }


  ngOnInit() {
    this.resetForm();
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
    this.adminService.adminAuthentication(userName, password).subscribe((user: any) => {
     localStorage.setItem('userToken', user.access_token); //postavlja token admina u lokalnu promenljivu
     this.adminService.getUserClaims().subscribe((data: any) => {
     this.adminClaims = data;
     this.adminService.admin = data;
     this.adminService.setValue(true);
     console.log(this.adminService.admin);
     console.log(localStorage.getItem('userToken'));
     this.resetForm();
     if (data.IsAdmin) {
      localStorage.setItem('adminName', data.UserName);
      this.router.navigate(['admin-products/list-products']);
    } else {
      localStorage.removeItem('userToken');
     }
    });
   },
   (err: HttpErrorResponse) => {
     this.isLoginError = true;
   });
  //  this.router.navigate(['admin-products/list-products']);
 }


 }
