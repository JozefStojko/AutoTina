import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/product.model';
import { ProductService } from 'src/app/shared/service/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

    public filteredCars: Product[];

  constructor(
    public productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location


  ) { }

  ngOnInit() {
    this.filteredProductByCatalogeNumber();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  public createImagePath(serverPath: string) {
    return 'http://localhost:52866/image/'+serverPath;
  } 

  updateProductImage() {
    this.router.navigate(['/admin-products/update-product-image']);
  }

  updateProduct() {
    this.router.navigate(['/admin-products/update-product']);
}

deleteProduct(product: Product) {
  this.productService.remove(this.productService.product.Id).subscribe(() => {  
    this.toastr.success(
      'Uspešno ste',
      'obrisali deo!',
         {
       timeOut: 5000,
       progressBar: true,
      });

    this.router.navigate(['/admin-products/list-products']);
  });  
}

filteredProductByCatalogeNumber() {  
  var filter = this.productService.product.CatalogNumber.toLowerCase();
  console.log(filter);
  this.productService.productList = this.productService.fixProductList.filter(
    product => product.ComparativeNumbers.toLowerCase().indexOf(filter) !== -1 )

  // this.productService.productList = this.productService.fixProductList.filter(
  //   product => product.ComparativeNumbers === product.CatalogNumber);
    this.filteredCars = this.productService.productList;
    this.filteredCars.push(this.productService.product);
    this.filteredCars = this.filteredCars.sort((a, b ) => a.CarMark.Mark < b.CarMark.Mark ? -1 : 1);
   console.log(this.filteredCars);
  } 




}
