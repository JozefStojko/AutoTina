import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartType } from 'src/app/shared/model/part-type.model';
import { PartTypeService } from 'src/app/shared/service/part-type.service';

@Component({
  selector: 'app-update-part-type-image',
  templateUrl: './update-part-type-image.component.html',
  styleUrls: ['./update-part-type-image.component.css']
})
export class UpdatePartTypeImageComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  partType: PartType;
  allPartTypes: PartType[];
  error: string;
  buttondisabled: boolean = false;



 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public partTypeService: PartTypeService,
    ) { }

    //@ViewChild('mark') mark;

  ngOnInit() {
    console.log(this.partTypeService.partType);
    this.partType = {
      Id: this.partTypeService.partType.Id,
      ProductType: this.partTypeService.partType.ProductType,
      ProductTypeImage: this.partTypeService.partType.ProductTypeImage
    };

  }

  OnUpdatePartType(image) {
    console.log(this.fileToUpload);
    console.log(this.partType);
    this.partTypeService.putPartType(this.partType.Id.toString(), this.partType.ProductType, this.fileToUpload).subscribe(
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

    }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.partTypeService.partType = {
      Id: null,
      ProductType: '',
      ProductTypeImage: null
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
