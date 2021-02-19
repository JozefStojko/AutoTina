import { HashLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})

export class UserSignUpComponent implements OnInit {
  user: User;
  isLoginError = false;
  userClaims: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private userService: UserService,
    private router: Router,
    private userData: UserService,
    private toastr: ToastrService

    ) { }

  ngOnInit() {
    this.resetForm();
    }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
      Phone: '',
      City: '',
      ZipCode: 0,
      Address: '',
      IsAdmin: false,
      IdNumber: null,
      CompanyName: ''
    };
  }

  OnSubmit(firstName, lastName, userName, password, password2, email, phone, city, zipCode, address, companyName, pib) {
    if (password === password2) {
    this.user = {
      UserName: userName,
      Password: password,
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      City: city,
      ZipCode: zipCode,
      Address: address,
      IsAdmin: false,
      // IdNumber: 234565,
      CompanyName: companyName,
      PIB: pib
    }
    this.userService.userRegister(this.user).subscribe(
      (userData: User) => {
        console.log(userData);
        this.userService.user = this.user;
        this.userService.userAuthentication(userName, password).subscribe((user: any) => {
          localStorage.setItem('userToken', user.access_token); //postavlja token admina u lokalnu promenljivu
          this.userService.getUserClaims().subscribe((data: any) => {
          this.userService.user = data;
          this.router.navigate(['users/user-home']);
          console.log(this.userService.user);
          console.log(localStorage.getItem('userToken'));
  
          this.userService.setValue(true);
          // localStorage.setItem('user', data.FirstName);
          localStorage.setItem('userName', data.UserName);
          this.resetForm();
          });
        },
  
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
        });
 
      },
      (error: any) => console.log(console.error()
      ));

    } else {
      this.toastr.warning(
        'Lozinke nisu identične!',
        'Morate upisati identične lozinke.',
         {
          timeOut: 5000,
          progressBar: true,
         });

    }
  
    };
  }
