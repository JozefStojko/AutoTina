import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';

@Component({
  selector: 'app-create-car-mark',
  templateUrl: './create-car-mark.component.html',
  styleUrls: ['./create-car-mark.component.css']
})
export class CreateCarMarkComponent implements OnInit {
  
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  carMark: CarMark;
  allCarMarks: CarMark[];
  carMarkService: any;
  setImageValue: any = null;
  fileUpload = {status: '', message: '', filePath: ''};
  error: string;
  buttondisabled: boolean = false;

  
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    //private dataAdmin: DataService,
    public adminService: AdminService,
    public carmarkService: CarMarkService
    ) { }


  ngOnInit() {
    this.resetForm();
  }

  OnSubmitMark(mark, image) {
      console.log('mark: ', mark.value, 'this.fileToUpload: ', this.fileToUpload);
      this.carmarkService.saveCarMark(mark.value, this.fileToUpload).subscribe(       
        res => this.fileUpload = res,          // console.log('done');
        err => this.error = err,
        () => {
          mark = '';
          image = '';
          this.imageUrl = "/assets/img/default-image.png";
          this.toastr.success(
           'Save succesfuly!',
           'The record in Carmark base',
            {
             timeOut: 5000,
             progressBar: true,
            });
            this.router.navigate(['/admin-products/list-products']);
        }
      );
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    if(this.fileToUpload.size<2097152) {
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.buttondisabled = false;

    }
    else {
      this.imageUrl = "/assets/img/default-image.png";
      this.toastr.warning(
        'Učitajte drugu sliku',
        'Slika je prevelika',
         {
          timeOut: 5000,
          progressBar: true,
         });
         this.buttondisabled = true;
        }
  }


  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.carmarkService.carMark = {
      Id: '',
      Mark: '',
      Image: null
    };
    this.imageUrl = "/assets/img/default-image.png";
  }

}
