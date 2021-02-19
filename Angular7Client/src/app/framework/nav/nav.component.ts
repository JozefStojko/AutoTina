import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/service/admin.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { ProductService } from 'src/app/shared/service/product.service';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/model/user.model';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [ Globals ]
})
export class NavComponent implements OnInit {
  navbarOpen = false;
  admin = '';
  user = '';
  public itsAdmin: boolean;
  public itsUser: boolean;
  productTypeSelect: number = null;
  filterProductByTypeSelect: number = null;
  


  constructor(
    private router: Router,
    public adminService: AdminService,
    public userService: UserService,
    public productService: ProductService
    ) { }

  ngOnInit() {
    this.adminService.getValue().subscribe((value) => {
      this.itsAdmin = value;
      this.admin = localStorage.getItem('adminName');
      console.log(this.itsAdmin);
    });
    this.userService.getValue().subscribe((value) => {
      this.itsUser = value;
      this.user = localStorage.getItem('userName');
      console.log(this.itsUser);
    });

    // this.adminSignIn = this.adminService.itsAdminSignIn;
    // this.adminData.currentAdmin.subscribe(admin => this.admin = admin);
    // this.itsAdmin = this.adminService.itsAdminSignIn;
    // this.itsAdmin = JSON.parse(localStorage.getItem('userIsAdminOrNote'));


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
  editAdmin() {
    this.router.navigate(['users/admin-home']);
  }

  signOutAdmin() {
    localStorage.removeItem('userToken');
    this.adminService.setValue(false);
    this.itsAdmin = false;

    // this.adminData.adminSignInFunction('');
    // this.adminService.itsAdminSignIn = false;
    // console.log(this.adminService.itsAdminSignIn + ': ez az navbol miutan sign out');
    // localStorage.setItem('userIsAdminOrNote', JSON.stringify(false));
    this.router.navigate(['/home']);
  }

  editUser() {
    // this.userService.user = Object.assign({}, user);
    this.router.navigate(['users/user-edit']);
  }

  signOutUser() {
    localStorage.removeItem('userToken');
    this.userService.setValue(false);
    this.itsUser = false;

    // this.adminData.adminSignInFunction('');
    // this.adminService.itsAdminSignIn = false;
    // console.log(this.adminService.itsAdminSignIn + ': ez az navbol miutan sign out');
    // localStorage.setItem('userIsAdminOrNote', JSON.stringify(false));
    this.router.navigate(['/home']);
  }



  // writingUsername(signedInAdmin: string) {
  // }

}
