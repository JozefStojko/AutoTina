import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public user: User
  error: any;
  
  constructor(
    private location: Location,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.userService.user = Object.assign({}, carType);
    this.user = this.userService.user;

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  OnUpdateUser(firstName, lastName, userName, password, password2, email, phone, city, zipCode, address, companyName, pib) {
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
      PIB: pib,
      Id: this.userService.user.Id
    }
    this.userService.putUser(this.user).subscribe(
      res => console.log('done'),
      err => this.error = err,
      () => {
        this.toastr.success(
         'Uspešna promena!',
         'Model je uspešno promenjen.',
          {
           timeOut: 5000,
           progressBar: true,
          });
          this.router.navigate(['/users/user-home']);
      }
    );
    }
    else{
      this.toastr.success(
        'Lozinke nisu identične!',
        'Morate upisati identične lozinke.',
         {
          timeOut: 5000,
          progressBar: true,
         });

    }
  }
}
