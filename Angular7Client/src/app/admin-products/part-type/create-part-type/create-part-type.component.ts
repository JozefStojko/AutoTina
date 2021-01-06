import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartType } from 'src/app/shared/model/part-type.model';
import { PartTypeService } from 'src/app/shared/service/part-type.service';

@Component({
  selector: 'app-create-part-type',
  templateUrl: './create-part-type.component.html',
  styleUrls: ['./create-part-type.component.css']
})
export class CreatePartTypeComponent implements OnInit {

  partType: PartType;
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  setImageValue: any = null;
  fileUpload = {status: '', message: '', filePath: ''};
  error: string;
  buttondisabled: boolean = false;





  constructor(
    private router: Router,
    private toastr: ToastrService,
    public partTypeService: PartTypeService

  ) { }

  ngOnInit() {
    this.resetForm();
  }

  OnSubmitPartType(partTypeName, image) {
      this.partTypeService.savePartType(partTypeName.value, this.fileToUpload).subscribe(       
        res => this.fileUpload = res,          // console.log('done');
        err => this.error = err,
        () => {
          partTypeName = '';
          image = '';
          this.imageUrl = "/assets/img/default-image.png";
          this.toastr.success(
            'Uspešan unos!',
            'Unet je novi tip delova u bazu.',
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
    this.partTypeService.partType = {
      Id: null,
      ProductType: '',
      ProductTypeImage: null
    };
    this.imageUrl = "/assets/img/default-image.png";
  }

}
