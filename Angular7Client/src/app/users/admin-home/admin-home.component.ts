import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../shared/service/admin.service';
import { Location } from '@angular/common';
import { Admin } from 'src/app/shared/model/admin.model';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
    
  public admin: Admin;
  error: any;
  
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    private location: Location

    ) { }

    
    

  ngOnInit() {
    this.admin = this.adminService.admin;
    console.log(this.adminService.admin);
      }

  goBack() {
    this.adminService.admin = this.admin;
    this.location.back(); // <-- go back to previous location on cancel
  }

  onUpdateAdmin(userName, firstName, lastName, city, address, zipCode, phone, email){
    this.admin = {
      UserName: userName,
      FirstName: firstName,
      LastName: lastName,
      City: city,
      Address: address,
      ZipCode: zipCode,
      Phone: phone,
      Email: email,
      Id: this.adminService.admin.Id,
      Password: this.adminService.admin.Password
    }
    this.adminService.putAdmin(this.admin).subscribe(
      res => console.log('done'),
      err => this.error = err,
      () => {
        this.toastr.success(
         'Uspešna podataka!',
         'Model je uspešno promenjen.',
          {
           timeOut: 5000,
           progressBar: true,
          });
          this.router.navigate(['/admin-products/list-products']);
      }
    );

  }
    

}
