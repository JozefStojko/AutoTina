import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import { UserService } from 'src/app/shared/service/user.service';
import { ShopService } from 'src/app/shared/service/shop.service';
import { Shop } from 'src/app/shared/model/shop.model';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  public filteredCars: Product[];
  private itsUser: boolean;
  private user = '';


  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private location: Location,
    private router: Router,
    private userService: UserService,
    private shopService: ShopService,

  ) { }

  ngOnInit() {
    this.filteredProductByCatalogeNumber();
    this.userService.getValue().subscribe((value) => {
      this.itsUser = value;
      this.user = localStorage.getItem('userName');
    });
    if (JSON.parse(localStorage.getItem("shoppingBasket" || "[]")) != null){
    this.shopService.shopList = JSON.parse(localStorage.getItem("shoppingBasket" || "[]"));
  }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  public createImagePath(serverPath: string) {
    return 'http://localhost:52866/image/'+serverPath;
  } 

filteredProductByCatalogeNumber() {  
  var filter = this.productService.product.CatalogNumber.toLowerCase();
  this.productService.productList = this.productService.fixProductList.filter(
    product => product.ComparativeNumbers.toLowerCase().indexOf(filter) !== -1 )

    this.filteredCars = this.productService.productList;
    this.filteredCars.push(this.productService.product);
    this.filteredCars = this.filteredCars.sort((a, b ) => a.CarMark.Mark < b.CarMark.Mark ? -1 : 1);
  } 

  onSubmitOrder(order) {
    if (!this.itsUser){
      this.toastr.success(
        'morate se prijaviti.',
        'Da bi naručili deo',
           {
         timeOut: 5000,
         progressBar: true,
        });
    } else {
      let shopObj = new Shop();
      shopObj.Id = Math.floor(Math.random() * 1000000);
      shopObj.UserName = this.user; 
      shopObj.ProductId = this.productService.product.Id;
      shopObj.ProductName = this.productService.product.ProductName;
      shopObj.Price = this.productService.product.Price;
      shopObj.Car = this.productService.product.CarMark.Mark + ', ' + this.productService.product.CarModel.Model + ', ' + this.productService.product.CarModelType.CarModelTypeName + ', ' + this.productService.product.CarModelTypeEngine.CarModelTypeEngineName;
      shopObj.NumberOfPiecesOfProduct = order;
      this.shopService.shopList.push(shopObj);
      localStorage.setItem("shoppingBasket", JSON.stringify(this.shopService.shopList));
      this.toastr.success(
        'deo u korpu.',
        'Uspešno ste dodali',
           {
         timeOut: 5000,
         progressBar: true,
        });
        this.location.back(); // <-- go back to previous location on cancel
      }
}



}
