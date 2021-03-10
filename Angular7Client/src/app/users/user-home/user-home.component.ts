import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/model/product.model';
import { ProductService } from 'src/app/shared/service/product.service';
import { ShopService } from 'src/app/shared/service/shop.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Location } from '@angular/common';
import { Shop } from 'src/app/shared/model/shop.model';
import { element } from '@angular/core/src/render3';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  public filteredCars: Product[];
  public productShopingList: Product[] = [];
  private itsUser: boolean;
  private user = '';
  public shopList = '';
  public totalPriceValue = 0;
  public newNumberOfPiecesOfProduct: number;
  private order: Shop;
  // public shoppingList:[] = [];
  // private counter  = 1;
  // private userString: string;


  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private location: Location,
    private router: Router,
    private userService: UserService,
    private shopService: ShopService,
  ) { }

  ngOnInit() {

    if (localStorage.getItem('userName') != ''){
      this.userService.setValue(true);
    }

    // this.filteredProductByCatalogeNumber();
    this.userService.getValue().subscribe((value) => {
      this.itsUser = value;
      this.user = localStorage.getItem('userName');
    });
    this.shopService.shopList = JSON.parse(localStorage.getItem("shoppingBasket" || "[]"));
    console.log(this.shopService.shopList);

    this.loadAllProduct();
    this.totalPriceValue = 0;


  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  orderShopItems(){
    let dateTime = new Date()
    console.log(dateTime);
    this.order = {
      UserName: "jstojko",
      ProductId: 3002,
      NumberOfPiecesOfProduct: 3,
      ProductName: "Klip",
      Price: 3600,
      Car: "Audi A3",
      Date: dateTime,
      RegularAccountNumber: "11111"
      }
    this.shopService.orderItems(this.order);
  }

  loadAllProduct() {  
    // localStorage.setItem('userIsAdminOrNote', JSON.stringify(false));
    this.productService.getAll().subscribe(
      result => {
        this.productService.productList = result;
        this.productService.fixProductList = result;
      },
      error => console.log("Error :: " + error),
      () => {
      console.log('done!',  this.productService.productList);

      this.filteredProductByCatalogeNumberToShoppingList();
    }
    )} 


filteredProductByCatalogeNumber() {  
  var filter = this.productService.product.CatalogNumber.toLowerCase();
  console.log(filter);
  this.productService.productList = this.productService.fixProductList.filter(
    product => product.ComparativeNumbers.toLowerCase().indexOf(filter) !== -1 )

    this.filteredCars = this.productService.productList;
    this.filteredCars.push(this.productService.product);
    this.filteredCars = this.filteredCars.sort((a, b ) => a.CarMark.Mark < b.CarMark.Mark ? -1 : 1);
   console.log(this.filteredCars);
  } 

  // popunjava listu delova za korpu
  filteredProductByCatalogeNumberToShoppingList() { 
    if (this.shopService.shopList != null){ 
    this.shopService.shopList.forEach((element) => {
        this.productShopingList.push(this.productService.fixProductList.find(
      product => product.Id === element.ProductId),);
        this.totalPriceValue = this.totalPriceValue + element.Price * element.NumberOfPiecesOfProduct;
    });
  }else{
    this.shopList = ' je prazna.'
  }
    } 
  

  onSubmitShopping(order) {
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
      shopObj.NumberOfPiecesOfProduct = order;
      this.shopService.shopList.push(shopObj);
      localStorage.setItem("shoppingBasket", JSON.stringify(this.shopService.shopList));
      console.log(this.shopService.shopList);
      this.toastr.success(
        'deo u korpu.',
        'Uspešno ste dodali',
            {
          timeOut: 5000,
          progressBar: true,
        });
        this.router.navigate(['/home']);
    }
}

onEditShopping(item){
  this.totalPriceValue = 0;
  console.log('helo', item);
  this.shopService.shopList.forEach((element) => {
    this.totalPriceValue = this.totalPriceValue + element.Price * element.NumberOfPiecesOfProduct;
  });
}

deleteShopItem(shopItem){
  this.shopService.shopList = this.shopService.shopList.filter(element => element.ProductId !== shopItem.ProductId );
  localStorage.setItem("shoppingBasket", JSON.stringify(this.shopService.shopList));
}


}
