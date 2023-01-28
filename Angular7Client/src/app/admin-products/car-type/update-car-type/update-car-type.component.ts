import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-car-type',
  templateUrl: './update-car-type.component.html',
  styleUrls: ['./update-car-type.component.css']
})
export class UpdateCarTypeComponent implements OnInit {

  carType: CarType;
  carMark: CarMark;
  allCarTypes: CarType[];
  allCarMarks: CarMark[];
  error: string;
  carMarkId: number = null;

 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    public carMarkService: CarMarkService,
    public carTypeService: CarTypeService,
    private location: Location
    ) { }


  ngOnInit() {
    this.carType = {
      Id: this.carTypeService.carType.Id,
      CarMarkId: this.carTypeService.carType.CarMarkId,
      Model: this.carTypeService.carType.Model,
      CarMark: this.carTypeService.carType.CarMark.Mark
    };
    this.loadAllCarMarks(); 
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  OnUpdateCarType(markId, type, yearFrom, yearTo) {
    this.carType = {
      Id: this.carTypeService.carType.Id,
      CarMarkId: markId,
      Model: type
    }
    this.carTypeService.putCarType(this.carType).subscribe(
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
          this.router.navigate(['/admin-products/list-products']);
      }
    );
    }

  loadAllCarMarks() {  
   this.carMarkService.getAllCarMarks().subscribe(
     result => this.allCarMarks = result,
     error => console.log("Error :: " + error),
     () => console.log('done!', this.allCarMarks)
   )}; 
  
 // Choose mark using select dropdown
 markToNumber(){
  this.carMarkId = +this.carMarkId;
}


  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.carTypeService.carType = {
      CarMarkId: null,
      Model: '',
      CarMark: ''
    };
  }

}