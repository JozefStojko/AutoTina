import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/service/admin.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { ProductService } from 'src/app/shared/service/product.service';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [ Globals ]
})
export class NavComponent implements OnInit {
  navbarOpen = false;
  admin = ''
  public itsAdmin: boolean;
  productTypeSelect: number = null;
  filterProductByTypeSelect: number = null;
  


  constructor(
    private router: Router,
    public adminService: AdminService,
    public productService: ProductService
    ) { }

  ngOnInit() {
    this.adminService.getValue().subscribe((value) => {
      this.itsAdmin = value;
      console.log(this.itsAdmin);
    });
    // this.adminSignIn = this.adminService.itsAdminSignIn;
    // this.adminData.currentAdmin.subscribe(admin => this.admin = admin);
    // this.itsAdmin = this.adminService.itsAdminSignIn;
    // this.itsAdmin = JSON.parse(localStorage.getItem('userIsAdminOrNote'));
    this.admin = localStorage.getItem('userAdminName');


  }
  
  
    //Filtering Product By Category/Type

    loadFilteredProductByType(filter: number) {  
    this.productService.productList = this.productService.fixProductList.filter(
      product => product.ProductTypeModelId === filter);
    } 


    //search Product
  filteredProductBySearch(search: string) {  
    this.productService.productList = this.productService.fixProductList.filter(
      product => (
        (product.ProductName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ) || 
        (product.CatalogNumber.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        ));
    } 


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  // signInUser(){
  //   console.log('user-sign-in');
  //   this.router.navigate(['/users/user-sign-in']);
  // }
  changeUserSign() {

  }

  signOut() {
    localStorage.removeItem('userToken');
    this.adminService.setValue(true);
    this.itsAdmin = false;

    // this.adminData.adminSignInFunction('');
    // this.adminService.itsAdminSignIn = false;
    // console.log(this.adminService.itsAdminSignIn + ': ez az navbol miutan sign out');
    // localStorage.setItem('userIsAdminOrNote', JSON.stringify(false));
    this.router.navigate(['/home']);
  }


  // writingUsername(signedInAdmin: string) {
  // }

}
