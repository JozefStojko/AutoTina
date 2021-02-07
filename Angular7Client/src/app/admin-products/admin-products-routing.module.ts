import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCarModelTypeEngineComponent } from './car-model-type-engine/create-car-model-type-engine/create-car-model-type-engine.component';
import { UpdateCarModelTypeEngineComponent } from './car-model-type-engine/update-car-model-type-engine/update-car-model-type-engine.component';
import { CreateCarMarkComponent } from './car-mark/create-car-mark/create-car-mark.component';
import { CreateCarModelTypeComponent } from './car-model-type/create-car-model-type/create-car-model-type.component';
import { CreateCarTypeComponent } from './car-type/create-car-type/create-car-type.component';
import { CreatePartTypeComponent } from './part-type/create-part-type/create-part-type.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateCarMarkComponent } from './car-mark/update-car-mark/update-car-mark.component';
import { UpdateCarModelTypeComponent } from './car-model-type/update-car-model-type/update-car-model-type.component';
import { UpdateCarTypeComponent } from './car-type/update-car-type/update-car-type.component';
import { UpdateImageComponent } from './car-mark/update-image/update-image.component';
import { UpdatePartTypeImageComponent } from './part-type/update-part-type-image/update-part-type-image.component';
import { UpdatePartTypeComponent } from './part-type/update-part-type/update-part-type.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ViewAllProductsComponent } from './product/view-all-products/view-all-products.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { UpdateProductImageComponent } from './product/update-product-image/update-product-image.component';

const routes: Routes = [
  { path: 'create-product', component: CreateProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'update-product-image', component: UpdateProductImageComponent },
  { path: 'create-car-mark', component: CreateCarMarkComponent },
  { path: 'create-car-type', component: CreateCarTypeComponent },
  { path: 'list-products', component: ViewAllProductsComponent },
  { path: 'view-product', component: ViewProductComponent },
  { path: 'update-car-mark', component: UpdateCarMarkComponent },
  { path: 'update-image', component: UpdateImageComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'update-car-type', component: UpdateCarTypeComponent },
  { path: 'create-part-type', component: CreatePartTypeComponent },
  { path: 'update-part-type', component: UpdatePartTypeComponent },
  { path: 'update-part-type-image', component: UpdatePartTypeImageComponent },
  { path: 'create-car-model-type', component: CreateCarModelTypeComponent },
  { path: 'update-car-model-type', component: UpdateCarModelTypeComponent },
  { path: 'create-car-model-type-engine', component: CreateCarModelTypeEngineComponent },
  { path: 'update-car-model-type-engine', component: UpdateCarModelTypeEngineComponent },
  { path: '', component: ViewAllProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductsRoutingModule { }
