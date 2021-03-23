import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserSuccessShopComponent } from './user-success-shop/user-success-shop.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'user-sign-up', component: UserSignUpComponent },
  { path: 'user-sign-in', component: UserSignInComponent },
  { path: 'admin', component: AdminSignInComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'user-success-shop', component: UserSuccessShopComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
