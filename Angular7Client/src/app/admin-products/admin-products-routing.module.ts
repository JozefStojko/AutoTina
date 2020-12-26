import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCarMarkComponent } from './create-car-mark/create-car-mark.component';
import { CreateCarTypeComponent } from './create-car-type/create-car-type.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateCarMarkComponent } from './update-car-mark/update-car-mark.component';
import { UpdateCarTypeComponent } from './update-car-type/update-car-type.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ViewAllProductsByCategoryComponent } from './view-all-products-by-category/view-all-products-by-category.component';
import { ViewAllProductsByDateComponent } from './view-all-products-by-date/view-all-products-by-date.component';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  { path: 'create-product', component: CreateProductComponent },
  { path: 'create-car-mark', component: CreateCarMarkComponent },
  { path: 'create-car-type', component: CreateCarTypeComponent },
  { path: 'list-products', component: ViewAllProductsComponent },
  { path: 'search', component: ViewAllProductsByCategoryComponent },
  { path: 'search-date', component: ViewAllProductsByDateComponent },
  { path: 'delete-products/:id', component: DeleteProductComponent },
  { path: 'view-product/:id', component: ViewProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'update-car-mark', component: UpdateCarMarkComponent },
  { path: 'update-image', component: UpdateImageComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'update-car-type', component: UpdateCarTypeComponent },
  { path: '', component: ViewAllProductsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductsRoutingModule { }
