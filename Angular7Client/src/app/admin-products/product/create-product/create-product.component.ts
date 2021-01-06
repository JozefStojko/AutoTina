import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { PartType } from 'src/app/shared/model/part-type.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { PartTypeService } from 'src/app/shared/service/part-type.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  buttondisabled: boolean = false;
  allCarMarks: CarMark[];
  carMarkId: number = null;
  allCarTypes: CarType[];
  carTypeId: number = null;
  allPartTypes: PartType[];
  partTypeId: number = null;




  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carTypeService: CarTypeService,
    public carMarkService: CarMarkService,
    public partTypeService: PartTypeService



  ) { }

  ngOnInit() {
    this.loadAllCarMarks(); 
    this.loadAllCarTypes(); 
    this.loadAllPartTypes(); 

  }

  markToNumber(){
    this.carMarkId = +this.carMarkId;
    console.log(this.carMarkId);
  }

  carTypeToNumber(){
    this.carTypeId = +this.carTypeId;
    console.log(this.carTypeId);
  }

  productTypeToNumber(){
    this.partTypeId = +this.partTypeId;
    console.log(this.partTypeId);
  }
  
  loadAllCarMarks() {  
    this.carMarkService.getAllCarMarks().subscribe(
      result => this.allCarMarks = result,
      error => console.log("Error :: " + error),
      () => console.log('done!', this.allCarMarks)
    )};

    loadAllCarTypes() {  
      this.carTypeService.getAllCarTypes().subscribe(
        result => this.allCarTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarTypes)
      )}; 

  loadAllPartTypes() {  
    this.partTypeService.getAllPartTypes().subscribe(
      result => this.allPartTypes = result,
      error => console.log("Error :: " + error),
      () => console.log('done!', this.allPartTypes)
    )}; 


  stripText(event) {
    const seperator  = '^([0-9])';
    const maskSeperator =  new RegExp(seperator , 'g');  
    let result = maskSeperator.test(event.key);   return result;
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
