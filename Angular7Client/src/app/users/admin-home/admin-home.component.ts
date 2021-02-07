import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../shared/model/car.model';
import { CarMark } from '../../shared/model/carMark.model';
import { AdminService } from '../../shared/service/admin.service';
import { CarMarkService } from '../../shared/service/car-mark.service';
import { CarService } from '../../shared/service/car.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dataAdmin: DataService,
    public adminService: AdminService,
    public carmarkService: CarMarkService,
    public carService: CarService
    ) { }

    
    

  ngOnInit() {
      }



    
  signOut() {
    localStorage.removeItem('userToken');
    this.dataAdmin.adminSignInFunction('');
    this.router.navigate(['/admin']);
  }

}
