import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UserEditComponent,
    UserHomeComponent,
    UserSignUpComponent,
    UserSignInComponent,
    AdminSignInComponent,
    AdminHomeComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class UsersModule { }
