import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';

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
  godinaProizvodnjeOdValidna: boolean = true;
  godinaProizvodnjeOdValidnaDisabled: boolean = true;
  godinaProizvodnjeDoValidna: boolean = true;
  currentYear: number=new Date().getFullYear();
  // godinaPocetkaProizvodnje: number = new Date().getFullYear();
  godinaPocetkaProizvodnje: number;

 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    public carMarkService: CarMarkService,
    public carTypeService: CarTypeService
    ) { }


  ngOnInit() {
    this.carType = {
      Id: this.carTypeService.carType.Id,
      CarMarkId: this.carTypeService.carType.CarMarkId,
      Model: this.carTypeService.carType.Model,
      YearFrom: this.carTypeService.carType.YearFrom,
      YearTo: this.carTypeService.carType.YearTo,
      CarMark: this.carTypeService.carType.CarMark.Mark
    };
    this.loadAllCarMarks(); 
    this.godinaPocetkaProizvodnje = this.carType.YearFrom;
  }

  OnUpdateCarType(markId, type, yearFrom, yearTo) {
    this.carType = {
      Id: this.carTypeService.carType.Id,
      CarMarkId: markId,
      Model: type,
      YearFrom: yearFrom,
      YearTo: yearTo
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
  console.log(this.carMarkId);
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

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.carTypeService.carType = {
      CarMarkId: null,
      Model: '',
      YearFrom: null,
      YearTo: null,
      CarMark: ''
    };
  }

}