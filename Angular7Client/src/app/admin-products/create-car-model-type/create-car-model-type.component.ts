import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';

@Component({
  selector: 'app-create-car-model-type',
  templateUrl: './create-car-model-type.component.html',
  styleUrls: ['./create-car-model-type.component.css']
})
export class CreateCarModelTypeComponent implements OnInit {

  godinaProizvodnjeOdValidna: boolean = true;
  markaValidna: boolean = true;
  godinaProizvodnjeOdValidnaDisabled: boolean = true;
  godinaProizvodnjeDoValidna: boolean = true;
  allCarMarks: CarMark[];
  allCarTypes: CarType[];
  carMarkId: number = null;
  carTypeId: number = null;
  currentYear: number=new Date().getFullYear();
  godinaPocetkaProizvodnje: number = new Date().getFullYear();
  carType: CarType;
  carModelType: CarModelType;



  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carTypeService: CarTypeService,
    public carMarkService: CarMarkService,
    public carModelTypeService: CarModelTypeService

  ) { }

  ngOnInit() {
    this.loadAllCarMarks(); 
    // this.carMarkId = this.allCarMarks[0];
  }

  OnSubmitType(carModelId, carModelType, yearFrom, yearTo) {
    this.carModelType = {
      CarModelId: carModelId,
      CarModelType: carModelType,
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

    loadCarMarkIdTypes(carMarkId: number) {  
      this.carTypeService.getCarMarkIdTypes(carMarkId).subscribe(
        result => this.allCarTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarTypes)
      )}; 
  


   // Choose mark using select dropdown
   markToNumber(){
    this.carMarkId = +this.carMarkId;
    console.log(this.carMarkId);
    this.loadCarMarkIdTypes(this.carMarkId); 
    this.markaValidna = false;

  }

     // Choose type using select dropdown
     typeToNumber(){
      this.carTypeId = +this.carTypeId;
      console.log(this.carTypeId);
    }
  
  
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
  

}
