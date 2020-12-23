import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';

@Component({
  selector: 'app-create-car-type',
  templateUrl: './create-car-type.component.html',
  styleUrls: ['./create-car-type.component.css']
})
export class CreateCarTypeComponent implements OnInit {
  
  godinaProizvodnjeOdValidna: boolean = true;
  godinaProizvodnjeOdValidnaDisabled: boolean = true;
  godinaProizvodnjeDoValidna: boolean = true;
  allCarMarks: CarMark[];
  carMarkId: number = null;
  currentYear: number=new Date().getFullYear();
  godinaPocetkaProizvodnje: number = new Date().getFullYear();;



  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carTypeService: CarTypeService,
    public carMarkService: CarMarkService

  ) { }

  ngOnInit() {
    this.loadAllCarMarks(); 
    // this.carMarkId = this.allCarMarks[0];
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

stripTextyearTo(event) {
  const seperator  = '^([0-9])';
  const maskSeperator =  new RegExp(seperator , 'g');  
  let result =maskSeperator.test(event.key);   return result;
   }

   stripTextyearFrom(event) {
    const seperator  = '^([0-9])';
    const maskSeperator =  new RegExp(seperator , 'g');  
    let result =maskSeperator.test(event.key);   return result;
     }
  
   

}
