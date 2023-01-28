import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelTypeEngine } from 'src/app/shared/model/car-model-type-engine.model';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeEngineService } from 'src/app/shared/service/car-model-type-engine.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-car-model-type-engine',
  templateUrl: './update-car-model-type-engine.component.html',
  styleUrls: ['./update-car-model-type-engine.component.css']
})
export class UpdateCarModelTypeEngineComponent implements OnInit {

  carType: CarType;
  carMark: CarMark;
  carModelType: CarModelType;
  carModelTypeEngine: CarModelTypeEngine;
  allCarTypes: CarType[];
  allCarMarks: CarMark[];
  allCarModelTypes: CarModelType[];
  allCarModelTypesEngine: CarModelTypeEngine[];
  error: string;
  carMarkId: number = null;
  carTypeId: number = null;
  carModelTypeId: number = null;
  markaValidna: boolean = true;
  tipValidan: boolean = true;


 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carMarkService: CarMarkService,
    public carTypeService: CarTypeService,
    public carModelTypeService: CarModelTypeService,
    public carModelTypeEngineService: CarModelTypeEngineService,
    private location: Location
    ) { }


  ngOnInit() {
    this.carModelTypeEngine = {
      Id: this.carModelTypeEngineService.carModelTypeEngine.Id,
      CarModelTypeEngineName: this.carModelTypeEngineService.carModelTypeEngine.CarModelTypeEngineName,
      CarModelTypeId: this.carModelTypeEngineService.carModelTypeEngine.CarModelTypeId,
      CarMark: this.carModelTypeEngineService.carModelTypeEngine.CarModelType.CarModel.CarMark.Mark,
      CarModel: this.carModelTypeEngineService.carModelTypeEngine.CarModelType.CarModel.Model,
      CarModelType: this.carModelTypeEngineService.carModelTypeEngine.CarModelType.CarModelTypeName
    };

    this.loadAllCarMarks(); 
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  OnUpdateCarModelTypeEngine(CarModelTypeEngineName, CarModelTypeId) {
    this.carModelTypeEngine = {
      Id: this.carModelTypeEngineService.carModelTypeEngine.Id,
      CarModelTypeEngineName: CarModelTypeEngineName,
      CarModelTypeId: CarModelTypeId,
    }
    this.carModelTypeEngineService.putCarModelTypeEngine(this.carModelTypeEngine).subscribe(
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
  this.tipValidan = true;
}

 // Choose type using select dropdown
 typeToNumber(){
  this.carTypeId = +this.carTypeId;
  this.loadCarModelTypeIdModel(this.carTypeId); 
  this.tipValidan = false;
}

 // Choose model type using select dropdown
 modelTypeToNumber(){
  this.carModelTypeId = +this.carModelTypeId;
  this.tipValidan = false;
}




loadCarTypeIdMarks(carMarkId: number) {  
  this.carTypeService.getCarMarkIdTypes(carMarkId).subscribe(
    result => this.allCarTypes = result,
    error => console.log("Error :: " + error),
    () => console.log('done!', this.allCarTypes)
  )}; 

loadCarModelTypeIdModel(carModelTypeId: number) {  
  this.carModelTypeService.getCarModelTypeIdModelType(carModelTypeId).subscribe(
    result => this.allCarModelTypes = result,
    error => console.log("Error :: " + error),
    () => console.log('done!', this.allCarModelTypes)
  )}; 



  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.carModelTypeEngineService.carModelTypeEngine = {
      CarModelTypeEngineName: '',
      CarModelTypeId: null,
      CarMark: null,
      CarModel: null,
      CarModelType: null,
    };
  }

}