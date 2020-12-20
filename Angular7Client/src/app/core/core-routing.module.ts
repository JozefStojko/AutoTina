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


// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// // import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
// import { AdminGuard } from './shared/guard/admin.guard';
// // import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
// // import { UserHomeComponent } from './user/user-home/user-home.component';
// // import { UserEditComponent } from './user/user-edit/user-edit.component';
// // import { UserSignInComponent } from './user/user-sign-in/user-sign-in.component';
// // import { UserSignUpComponent } from './user/user-sign-up/user-sign-up.component';
// import { AdminProductsComponent } from './admin-products/admin-products.component';
// //import { ProductsComponent } from './products/products.component';






// const routes: Routes = [
//   // { path: 'admin', component: AdminSignInComponent },
//   // { path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard] },
//   //{ path: 'admin-products', loadChildren: () => import('./admin-products/admin-products.module').then(m => m.AdminProductsModule) },
//   { path: 'admin-products', loadChildren: './admin-products/admin-products.module#AdminProductsModule', canActivate: [AdminGuard] },
//   { path: 'products', loadChildren: './products/products.module#ProductsModule' },
//   // { path: 'user-home', component: UserHomeComponent },
//   // { path: 'user-edit', component: UserEditComponent },
//   // { path: 'user-sign-in', component: UserSignInComponent },
//   { path: '', redirectTo: 'home', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
