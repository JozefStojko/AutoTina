import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewProductsComponent } from './view-products/view-products.component';

@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class ProductsModule { }
