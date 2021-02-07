import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public productService: ProductService,
    private adminService: AdminService

  ) { }

  ngOnInit() {
    this.loadAllProduct();
  }

  loadAllProduct() {  
    // localStorage.setItem('userIsAdminOrNote', JSON.stringify(false));
    this.productService.getAll().subscribe(
      result => {
        this.productService.productList = result;
        this.productService.fixProductList = result;
      },
      error => console.log("Error :: " + error),
      () => console.log('done!', this.productService.productList)
    )} 


}
