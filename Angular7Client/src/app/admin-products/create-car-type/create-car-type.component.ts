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
  godinaProizvodnjeDoValidna: boolean = true;
  allCarMarks: CarMark[];
  carMarkId: number = null;



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

}
