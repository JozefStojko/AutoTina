import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-car-type',
  templateUrl: './create-car-type.component.html',
  styleUrls: ['./create-car-type.component.css']
})
export class CreateCarTypeComponent implements OnInit {
  
  allCarMarks: CarMark[];
  carMarkId: number = null;
  carType: CarType;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carTypeService: CarTypeService,
    public carMarkService: CarMarkService,
    private location: Location

  ) { }

  ngOnInit() {
    this.loadAllCarMarks(); 
    // this.carMarkId = this.allCarMarks[0];
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  OnSubmitType(markId, type) {
    this.carType = {
      CarMarkId: markId,
      Model: type
    }
    this.carTypeService.saveCarType(this.carType).subscribe(       
      res => console.log('done'), //this.fileUpload = res,
      err => console.log('err'), // this.error = err,
      () => {
        this.toastr.success(
         'Uspešan unos!',
         'Unet je novi tip u bazu.',
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


}
