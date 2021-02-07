import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelTypeEngine } from 'src/app/shared/model/car-model-type-engine.model';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { PartType } from 'src/app/shared/model/part-type.model';
import { Product } from 'src/app/shared/model/product.model';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeEngineService } from 'src/app/shared/service/car-model-type-engine.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { PartTypeService } from 'src/app/shared/service/part-type.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product;
  allProducts: Product[];
  error: string;
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
    console.log(this.productService.product);

    this.product = {
      Id: this.productService.product.Id,
      ProductTypeModelId: this.productService.product.ProductTypeModelId,
      CarModelTypeId: this.productService.product.CarModelTypeId,
      CarModelId: this.productService.product.CarModelId,
      CarMarkId: this.productService.product.CarMarkId,
      CarModelTypeEngineId: this.productService.product.CarModelTypeEngineId,
      CatalogNumber: this.productService.product.CatalogNumber,
      ProductName: this.productService.product.ProductName,
      OnLager: this.productService.product.OnLager,
      Price: this.productService.product.Price,
      Image: this.productService.product.Image,
      Description: this.productService.product.Description,
      ComparativeNumbers: this.productService.product.ComparativeNumbers,
      CarModelTypeEngine: this.productService.product.CarModelTypeEngine,
      CarModelType: this.productService.product.CarModelType,
      CarModel: this.productService.product.CarModel,
      CarMark: this.productService.product.CarMark,
      ProductTypeModel: this.productService.product.ProductTypeModel
    };
    this.loadAllProducts(); 
    this.loadAllCarMarks(); 
    this.loadAllPartTypes(); 
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  OnUpdateProduct(carMarkSelect, carTypeSelect, productTypeSelect, carModelTypeSelect, carModelTypeEngineSelect, catalogNumber, productName, onLager, price, description, comparativeNumbers) {
    if (carMarkSelect == null){
      carMarkSelect = this.product.CarMarkId;
    }
    if (carTypeSelect == null){
      carTypeSelect = this.product.CarModelId;
    }
    if (carModelTypeSelect == null){
      carModelTypeSelect = this.product.CarModelTypeId;
    }

    if (carModelTypeEngineSelect == null){
      carModelTypeEngineSelect = this.product.CarModelTypeEngineId;
    }

    if (productTypeSelect == null){
      productTypeSelect = this.product.ProductTypeModelId;
    }


    this.product = {
      Id: this.productService.product.Id,
      ProductTypeModelId: productTypeSelect,
      CarModelTypeId: carModelTypeSelect,
      CarModelId: carTypeSelect,
      CarMarkId: carMarkSelect,
      CarModelTypeEngineId: carModelTypeEngineSelect,
      CatalogNumber: catalogNumber,
      ProductName: productName,
      OnLager: onLager,
      Price: price,
      Image: this.productService.product.Image,
      Description: description,
      ComparativeNumbers: comparativeNumbers,
    }
    this.productService.putProductNoImage(
      this.productService.product.Id, 
      carMarkSelect,
      carTypeSelect,
      productTypeSelect,
      carModelTypeSelect,
      carModelTypeEngineSelect,
      catalogNumber,
      productName,
      onLager,
      price,
      description,
      comparativeNumbers,
      this.productService.product.Image).subscribe(
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

  loadAllProducts() {  
   this.productService.getAll().subscribe(
     result => this.allProducts = result,
     error => console.log("Error :: " + error),
     () => console.log('done!', this.allProducts)
   )}; 

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
  }

}