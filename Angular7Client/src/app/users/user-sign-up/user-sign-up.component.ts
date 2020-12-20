import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userData: UserService
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
      IsAdmin: false
    };
  }

  OnSubmit(firstName, lastName, userName, password, email, phone, city, zipCode, address): void {
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
      IsAdmin: false
    }
    this.userService.userRegister(this.user).subscribe(
      (userData: User) => {
        console.log(userData);
      },
      (error: any) => console.log(console.error()
      ));
        
    this.router.navigate(['/user-home']);
    }
    
}
