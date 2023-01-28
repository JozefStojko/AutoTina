import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../framework/home/home.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent, pathMatch: 'full' },
{ path: 'users', loadChildren: '../users/users.module#UsersModule' },
{ path: 'admin-products', loadChildren: '../admin-products/admin-products.module#AdminProductsModule' },
{ path: 'products', loadChildren: '../products/products.module#ProductsModule' },
{ path: '', redirectTo: 'home', pathMatch: 'full' }
  //{ path: 'admin-products', loadChildren: () => import('./admin-products/admin-products.module').then(m => m.AdminProductsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

