import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-car-mark',
  templateUrl: './update-car-mark.component.html',
  styleUrls: ['./update-car-mark.component.css']
})
export class UpdateCarMarkComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  carMark: CarMark;
  allCarMarks: CarMark[];
  carMarkService: any;
  error: string;
  

 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    public carmarkService: CarMarkService,
    private location: Location
    ) { }


  ngOnInit() {
    this.carMark = {
      Id: this.carmarkService.carMark.Id,
      Mark: this.carmarkService.carMark.Mark,
      Image: this.carmarkService.carMark.Image
    };

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  OnUpdateCarMark(mark) {
    this.carmarkService.putCarMarkNoImage(this.carmarkService.carMark.Id.toString(), mark.value, this.carmarkService.carMark.Image).subscribe(
      res => console.log('done'),
      err => this.error = err,
      () => {
        this.imageUrl = "/assets/img/default-image.png";
        this.toastr.success(
          'Uspešna promena!',
          'Marka je uspešno promenjena.',
           {
           timeOut: 5000,
           progressBar: true,
          });
          this.router.navigate(['/admin-products/list-products']);
      }
    );
    }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.carmarkService.carMark = {
      Id: null,
      Mark: '',
      Image: null
    };
  }

}
