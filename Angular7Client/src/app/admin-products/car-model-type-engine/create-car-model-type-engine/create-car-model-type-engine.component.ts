import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeEngineService } from 'src/app/shared/service/car-model-type-engine.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';

@Component({
  selector: 'app-create-car-model-type-engine',
  templateUrl: './create-car-model-type-engine.component.html',
  styleUrls: ['./create-car-model-type-engine.component.css']
})
export class CreateCarModelTypeEngineComponent implements OnInit {

  godinaProizvodnjeOdValidna: boolean = true;
  markaValidna: boolean = true;
  tipValidan: boolean = true;
  godinaProizvodnjeOdValidnaDisabled: boolean = true;
  godinaProizvodnjeDoValidna: boolean = true;
  allCarMarks: CarMark[];
  allCarTypes: CarType[];
  allCarModelTypes: CarModelType[];
  carMarkId: number = null;
  carTypeId: number = null;
  carModelTypeId: number = null;
  carMark: CarMark;
  carType: CarType;
  carModelType: CarModelType;



  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carTypeService: CarTypeService,
    public carMarkService: CarMarkService,
    public carModelTypeService: CarModelTypeService,
    public carModelTypeEngineService: CarModelTypeEngineService

  ) { }

  ngOnInit() {
    this.loadAllCarMarks(); 
  }

  OnSubmitCreateCarModelTypeEngine(carModelId, CarModelTypeName, yearFrom, yearTo) {
    this.carModelType = {
      CarModelId: carModelId,
      CarModelTypeName: CarModelTypeName,
      YearFrom: yearFrom,
      YearTo: yearTo
    }
    console.log('carModelType: ', this.carModelType);
    this.carModelTypeService.saveCarModelType(this.carModelType).subscribe(       
      res => console.log('done'), //this.fileUpload = res,
      err => console.log('err'), // this.error = err,
      () => {
        this.toastr.success(
         'Uspešan unos!',
         'Unet je novi tip moderla u bazu.',
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

    loadCarTypesIdMark(carMarkId: number) {  
      this.carTypeService.getCarMarkIdTypes(carMarkId).subscribe(
        result => this.allCarTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarTypes)
      )}; 

      loadCarModelIdTypes(carTypeId: number) {  
        this.carModelTypeService.getCarModelType(carTypeId).subscribe(
          result => this.allCarModelTypes = result,
          error => console.log("Error :: " + error),
          () => console.log('done!', this.allCarModelTypes)
        )}; 
  
  


   // Choose mark using select dropdown
   markToNumber(){
    this.carMarkId = +this.carMarkId;
    console.log(this.carMarkId);
    this.loadCarTypesIdMark(this.carMarkId);
    this.markaValidna = false;
  }

     // Choose type using select dropdown
     typeToNumber(){
      this.carTypeId = +this.carTypeId;
      this.loadCarModelIdTypes(this.carTypeId); 
      this.markaValidna = false;
    }

       // Choose model type using select dropdown
       carModelTypeToNumber(){
      this.carModelTypeId = +this.carModelTypeId;
    }

  
  stripText(event) {
    const seperator  = '^([0-9])';
    const maskSeperator =  new RegExp(seperator , 'g');  
    let result = maskSeperator.test(event.key);   return result;
     }
  

}
