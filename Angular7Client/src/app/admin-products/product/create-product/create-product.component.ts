import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelTypeEngine } from 'src/app/shared/model/car-model-type-engine.model';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { PartType } from 'src/app/shared/model/part-type.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeEngineService } from 'src/app/shared/service/car-model-type-engine.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { PartTypeService } from 'src/app/shared/service/part-type.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { Location } from '@angular/common';

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
  allCarTypes: CarType[];
  allCarModelTypes: CarModelType[];
  allCarModelTypeEngines: CarModelTypeEngine[];
  carMarkSelect: number = null;
  carTypeSelect: number = null;
  carModelTypeSelect: number = null;
  allPartTypes: PartType[];
  productTypeSelect: number = null;
  markaValidna: boolean = true;
  tipValidan: boolean = true;
  modelTipValidan: boolean = true;
  fileUpload = {status: '', message: '', filePath: ''};
  error: string;




  constructor(
    private router: Router,
    private toastr: ToastrService,
    public carTypeService: CarTypeService,
    public carModelTypeService: CarModelTypeService,
    public carModelTypeEngineService: CarModelTypeEngineService,
    public carMarkService: CarMarkService,
    public partTypeService: PartTypeService,
    public productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadAllCarMarks(); 
    this.loadAllPartTypes(); 

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  } 


  OnSubmitCreateProduct(carMarkSelect, carTypeSelect, productTypeSelect, carModelTypeSelect, carModelTypeEngineSelect, catalogNumber, productName, onLager, price, image, description, comparativeNumbers) {

    if (carMarkSelect == null){
      carMarkSelect = 0;
    }
    if (carTypeSelect == null){
      carTypeSelect = 0;
    }
    if (carModelTypeSelect == null){
      carModelTypeSelect = 0;
    }
    if (carModelTypeEngineSelect == null){
      carModelTypeEngineSelect = 0;
    }
    this.productService.saveProduct(
      carMarkSelect, 
      carTypeSelect,
      productTypeSelect, 
      carModelTypeSelect,
      carModelTypeEngineSelect,
      catalogNumber,
      productName,
      onLager,
      price,
      this.fileToUpload,
      description,
      comparativeNumbers).subscribe(   
      res => this.fileUpload = res,          // console.log('done');
      err => this.error = err,
      () => {
        carMarkSelect  = null;
        carTypeSelect = null;
        productTypeSelect = null;
        carModelTypeSelect = null;
        carModelTypeEngineSelect = null;
        catalogNumber = '';
        productName = '';
        onLager = null;
        price = null;
        image = '';
        description = '';
        comparativeNumbers = '';
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

  markToNumber(){
    this.carMarkSelect = +this.carMarkSelect;
    this.loadCarTypeIdMarks(this.carMarkSelect); 
    this.markaValidna = false;
    console.log(this.carMarkSelect);
    this.tipValidan = true;
    this.modelTipValidan = true;

  }

 // Choose type using select dropdown
 typeToNumber(){
  this.carTypeSelect = +this.carTypeSelect;
  this.loadCarModelTypeIdModel(this.carTypeSelect); 
  console.log(this.carTypeSelect);
  this.tipValidan = false;
  this.modelTipValidan = true;
}

 // Choose model type using select dropdown
 modelTypeToNumber(){
  this.carModelTypeSelect = +this.carModelTypeSelect;
  this.loadCarModelTypeEngineIdModelType(this.carModelTypeSelect); 
  console.log(this.carModelTypeSelect);
  this.modelTipValidan = false;
}

  productTypeToNumber(){
    this.productTypeSelect = +this.productTypeSelect;
    console.log(this.productTypeSelect);
  }
  
  loadAllCarMarks() {  
    this.carMarkService.getAllCarMarks().subscribe(
      result => this.allCarMarks = result,
      error => console.log("Error :: " + error),
      () => console.log('done!', this.allCarMarks)
    )};

    loadCarTypeIdMarks(carMarkId: number) {  
      this.carTypeService.getCarMarkIdTypes(carMarkId).subscribe(
        result => this.allCarTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarTypes)
      )}; 

loadCarModelTypeIdModel(carModelTypeId: number) {  
  this.carModelTypeService.getCarModelTypeIdModelType(carModelTypeId).subscribe(
    result => this.allCarModelTypes = result,
    error => console.log("Error :: " + error),
    () => console.log('done!', this.allCarModelTypes)
  )}; 

  loadCarModelTypeEngineIdModelType(carModelTypeId: number) {  
    this.carModelTypeEngineService.getCarModelTypeEngines(carModelTypeId).subscribe(
      result => this.allCarModelTypeEngines = result,
      error => console.log("Error :: " + error),
      () => console.log('done!', this.allCarModelTypeEngines)
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
    this.productService.product = {
      Id: null,
      ProductTypeModelId: null,
      CarModelTypeId: null,
      CarModelId: null,
      CarMarkId: null,
      CarModelTypeEngineId: null,
      CatalogNumber: '',
      ProductName: '',
      OnLager: null,
      Price: null,
      Image: '',
      Description: '',
      ComparativeNumbers: '',
      CarModelTypeEngine: null,
      CarModelType: null,
      CarModel: null,
      CarMark: null,
      ProductTypeModel: null,
    };
    this.imageUrl = "/assets/img/default-image.png";
  }


}
