import { Component, OnInit } from '@angular/core';
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



  constructor(
    private router: Router,
    private toastr: ToastrService,
    public partTypeService: PartTypeService

  ) { }

  ngOnInit() {
    // this.loadAllCarMarks(); 
    // this.carMarkId = this.allCarMarks[0];
  }

  OnSubmitPartType(partType) {
    this.partType = {
      ProductType: partType
    }
    console.log('partType: ', this.partType);
    this.partTypeService.savePartType(this.partType).subscribe(       
      res => console.log('done'), //this.fileUpload = res,
      err => console.log('err'), // this.error = err,
      () => {
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

}
