import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/model/product.model';
import { ProductService } from 'src/app/shared/service/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-product-image',
  templateUrl: './update-product-image.component.html',
  styleUrls: ['./update-product-image.component.css']
})
export class UpdateProductImageComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  product: Product;
  allProducts: Product[];
  error: string;
  buttondisabled: boolean = false;



 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public productService: ProductService,
    private location: Location
    ) { }

    //@ViewChild('mark') mark;

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
    console.log(this.product);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



  OnUpdateProduct(image) {
    console.log(this.fileToUpload);
    console.log(this.product);
    this.productService.putProduct(
      this.product.Id,
      this.product.CarMarkId,
      this.product.CarModelId,
      this.product.ProductTypeModelId,
      this.product.CarModelTypeId,
      this.product.CarModelTypeEngineId,
      this.product.CatalogNumber,
      this.product.ProductName,
      this.product.OnLager,
      this.product.Price,
      this.product.Description,
      this.product.ComparativeNumbers,
      this.fileToUpload).subscribe(
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


  loadAllProduct() {  
    this.productService.getAllProduct().subscribe(
      result => this.allProducts = result,
      error => console.log("Error :: " + error),
      () => console.log('done!', this.allProducts)
    )}; 
 


}
