import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import { User } from 'src/app/shared/model/user.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageOfItems: Array<any>;
  private product: Product;
  public userName: string;
  public itsUserIn: boolean;
  private user: User;
  

  constructor(
    private router: Router,
    public productService: ProductService,
    private adminService: AdminService,
    private userService: UserService
       ) { }

  ngOnInit() {
    this.loadAllProduct();

    if (localStorage.getItem('userName') != ''){
      this.userService.setValue(true);
    }
    if (localStorage.getItem('adminName') != ''){
      this.adminService.setValue(true);
    }

  }

      // page pagination
      onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
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



    viewProduct(product: Product) {
      this.productService.product = Object.assign({}, product);
      this.router.navigate(['/admin-products/view-product']);
  }
  
  public createProductImagePath(serverPath: string) {
    return 'http://localhost:52866/image/'+serverPath;
  } 


}
