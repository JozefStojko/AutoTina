import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  carMark: CarMark;
  allCarMarks: CarMark[];
  carMarkService: any;
  error: string;
  buttondisabled: boolean = false;



 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    public carmarkService: CarMarkService,
    ) { }

    //@ViewChild('mark') mark;

  ngOnInit() {
    console.log(this.carmarkService.carMark);
    this.carMark = {
      Id: this.carmarkService.carMark.Id,
      Mark: this.carmarkService.carMark.Mark,
      Image: this.carmarkService.carMark.Image
    };

  }

  OnUpdateCarMark(image) {
    console.log(this.fileToUpload);
    console.log(this.carMark);
    this.carmarkService.putCarMark(this.carMark.Id.toString(), this.carMark.Mark, this.fileToUpload).subscribe(
      res => console.log('done'),
      err => this.error = err,
      () => {
        this.imageUrl = "/assets/img/default-image.png";
        this.toastr.success(
         'Update succesfuly!',
         'The record in Carmark base',
          {
           timeOut: 5000,
           progressBar: true,
          });
          this.router.navigate(['/admin-products/list-products']);
      }
  );
    // this.toastr.success(
    //   'Save succesfuly!',
    //   'The record in Carmark base',
    //    {
    //     timeOut: 5000,
    //     progressBar: true,
    //    });
    //    this.router.navigate(['/admin-products/list-products']);

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





}
