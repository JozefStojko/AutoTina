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
  admin = '';

  constructor(
    private adminData: AdminService,
    private router: Router,
    public adminService: AdminService,
    public productService: ProductService
    ) { }

  ngOnInit() {
    // this.adminSignIn = this.adminService.itsAdminSignIn;
    this.adminData.currentAdmin.subscribe(admin => this.admin = admin);
  }

  filteredProductBySearch(search: string) {  
     this.productService.productList = this.productService.fixProductList.filter(
      product => product.ProductName.toLowerCase().indexOf(search.toLowerCase()) !== -1 )

    } 


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  changeUserSign() {

  }

  signOut() {
    localStorage.removeItem('userToken');
    this.adminData.adminSignInFunction('');
    this.adminService.itsAdminSignIn = false;
    console.log(this.adminService.itsAdminSignIn + ': ez az navbol miutan sign out');
    this.router.navigate(['/home']);
  }


  // writingUsername(signedInAdmin: string) {
  // }

}
