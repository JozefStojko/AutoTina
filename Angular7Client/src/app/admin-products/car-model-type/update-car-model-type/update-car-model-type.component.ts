import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-car-model-type',
  templateUrl: './update-car-model-type.component.html',
  styleUrls: ['./update-car-model-type.component.css']
})
export class UpdateCarModelTypeComponent implements OnInit {

  carType: CarType;
  carMark: CarMark;
  carModelType: CarModelType;
  allCarTypes: CarType[];
  allCarMarks: CarMark[];
  allCarModelTypes: CarModelType[];
  error: string;
  carMarkId: number = null;
  carTypeId: number = null;
  godinaProizvodnjeOdValidna: boolean = true;
  godinaProizvodnjeOdValidnaDisabled: boolean = true;
  godinaProizvodnjeDoValidna: boolean = true;
  currentYear: number=new Date().getFullYear();
  // godinaPocetkaProizvodnje: number = new Date().getFullYear();
  godinaPocetkaProizvodnje: number;
  markaValidna: boolean = true;


 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    public carMarkService: CarMarkService,
    public carTypeService: CarTypeService,
    public carModelTypeService: CarModelTypeService,
    private location: Location
    ) { }


  ngOnInit() {
    console.log(this.carModelTypeService.carModelType.CarModelTypeName);

    this.carModelType = {
      Id: this.carModelTypeService.carModelType.Id,
      CarModelId: this.carModelTypeService.carModelType.CarModelId,
      CarModelTypeName: this.carModelTypeService.carModelType.CarModelTypeName,
      YearFrom: this.carModelTypeService.carModelType.YearFrom,
      YearTo: this.carModelTypeService.carModelType.YearTo,
      CarMark: this.carModelTypeService.carModelType.CarModel.CarMark.Mark,
      CarModel: this.carModelTypeService.carModelType.CarModel.Model
    };
    this.loadAllCarMarks(); 
    this.godinaPocetkaProizvodnje = this.carModelType.YearFrom;
    console.log(this.carModelType);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  OnUpdateCarType(carModelTypeName, carModelId, yearFrom, yearTo) {
    this.carModelType = {
      Id: this.carModelTypeService.carModelType.Id,
      CarModelTypeName: carModelTypeName,
      CarModelId: carModelId,
      YearFrom: yearFrom,
      YearTo: yearTo
    }
    this.carModelTypeService.putCarModelType(this.carModelType).subscribe(
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
  this.loadCarTypeIdMarks(this.carMarkId); 
  this.markaValidna = false;
  console.log(this.carMarkId);
}

 // Choose mark using select dropdown
 typeToNumber(){
  this.carTypeId = +this.carTypeId;
  console.log(this.carTypeId);
}

loadCarTypeIdMarks(carMarkId: number) {  
  this.carTypeService.getCarMarkIdTypes(carMarkId).subscribe(
    result => this.allCarTypes = result,
    error => console.log("Error :: " + error),
    () => console.log('done!', this.allCarTypes)
  )}; 


onKeyYearFrom(event: any) { // without type info
  if (1900 < event.target.value && event.target.value <= this.currentYear){
    this.godinaProizvodnjeOdValidna = false;
    this.godinaProizvodnjeOdValidnaDisabled = true;
  }
  else {
    this.godinaProizvodnjeOdValidna = true;
    this.godinaProizvodnjeOdValidnaDisabled = false;
  }
  this.godinaPocetkaProizvodnje = event.target.value
  console.log(event.target.value);
}

onKeyYearTo(event: any) { // without type info
  if (this.godinaPocetkaProizvodnje <= event.target.value && event.target.value <= this.currentYear){
    this.godinaProizvodnjeDoValidna = false;
  }
  else {
    this.godinaProizvodnjeDoValidna = true;
  }
  console.log(event.target.value);
}

stripText(event) {
  const seperator  = '^([0-9])';
  const maskSeperator =  new RegExp(seperator , 'g');  
  let result = maskSeperator.test(event.key);   return result;
   }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.carModelTypeService.carModelType = {
      CarModelId: null,
      CarModelTypeName: '',
      YearFrom: null,
      YearTo: null,
      CarMark: '',
      CarModel: ''
    };
  }

}