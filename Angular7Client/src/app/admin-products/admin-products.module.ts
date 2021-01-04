import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ViewAllProductsByDateComponent } from './view-all-products-by-date/view-all-products-by-date.component';
import { ViewAllProductsByCategoryComponent } from './view-all-products-by-category/view-all-products-by-category.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCarMarkComponent } from './create-car-mark/create-car-mark.component';
import { CreateCarTypeComponent } from './create-car-type/create-car-type.component';
import { UpdateCarMarkComponent } from './update-car-mark/update-car-mark.component';
import { UpdateCarTypeComponent } from './update-car-type/update-car-type.component';
import { CreatePartTypeComponent } from './create-part-type/create-part-type.component';
import { UpdatePartTypeComponent } from './update-part-type/update-part-type.component';
import { CreateCarModelTypeComponent } from './create-car-model-type/create-car-model-type.component';
import { UpdateCarModelTypeComponent } from './update-car-model-type/update-car-model-type.component';
import { UpdatePartTypeImageComponent } from './update-part-type-image/update-part-type-image.component';



@NgModule({
  declarations: [
    CreateProductComponent,
    ViewProductComponent,
    ViewAllProductsComponent,
    UpdateProductComponent,
    UpdateImageComponent,
    DeleteProductComponent,
    ViewAllProductsByDateComponent,
    ViewAllProductsByCategoryComponent,
    OrdersComponent,
    CreateCarMarkComponent,
    CreateCarTypeComponent,
    UpdateCarMarkComponent,
    UpdateCarTypeComponent,
    CreatePartTypeComponent,
    UpdatePartTypeComponent,
    CreateCarModelTypeComponent,
    UpdateCarModelTypeComponent,
    UpdatePartTypeImageComponent
  ],
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class AdminProductsModule { }
