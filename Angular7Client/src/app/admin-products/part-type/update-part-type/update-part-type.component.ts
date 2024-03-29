import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartType } from 'src/app/shared/model/part-type.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { PartTypeService } from 'src/app/shared/service/part-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-part-type',
  templateUrl: './update-part-type.component.html',
  styleUrls: ['./update-part-type.component.css']
})
export class UpdatePartTypeComponent implements OnInit {

  partType: PartType;
  allPartTypes: PartType[];
  error: string;

 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService,
    public partTypeService: PartTypeService,
    private location: Location
    ) { }


  ngOnInit() {

    this.partType = {
      Id: this.partTypeService.partType.Id,
      ProductType: this.partTypeService.partType.ProductType,
      ProductTypeImage: this.partTypeService.partType.ProductTypeImage
    };
    this.loadAllPartTypes(); 
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  OnUpdatePartType(partType) {
    this.partType = {
      Id: this.partTypeService.partType.Id,
      ProductType: partType.value,
      ProductTypeImage: this.partTypeService.partType.ProductTypeImage
    }
    this.partTypeService.putPartTypeNoImage(this.partTypeService.partType.Id.toString(), partType.value, this.partTypeService.partType.ProductTypeImage).subscribe(
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

  loadAllPartTypes() {  
   this.partTypeService.getAllPartTypes().subscribe(
     result => this.allPartTypes = result,
     error => console.log("Error :: " + error),
     () => console.log('done!', this.allPartTypes)
   )}; 
  

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

}