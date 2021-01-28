import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
// import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';

import { ProductService } from './shared/service/product.service';
import { UserService } from './shared/service/user.service';
import { AdminService } from './shared/service/admin.service';
import { AdminGuard } from './shared/guard/admin.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthInterceptor } from './shared/guard/auth.interceptor';
import { AdminInterceptor } from './shared/guard/admin.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Globals } from './globals';
// import { UserSignUpComponent } from './user/user-sign-up/user-sign-up.component';
// import { UserSignInComponent } from './user/user-sign-in/user-sign-in.component';
// import { UserHomeComponent } from './user/user-home/user-home.component';
// import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CarService } from './shared/service/car.service';
import { DataService } from './shared/service/data.service';
import { CarMarkService } from './shared/service/car-mark.service';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './framework/home/home.component';
import { FooterComponent } from './framework/footer/footer.component';
import { NavComponent } from './framework/nav/nav.component';
import { JwPaginationModule } from 'jw-angular-pagination';
// import { AdminProductsModule } from './admin-products/admin-products.module';
// import { ProductsModule } from './products/products.module';
// import { AdminOrdersModule } from './admin-orders/admin-orders.module';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent

    // AdminHomeComponent,
    // AdminSignInComponent,
    // UserSignUpComponent,
    // UserSignInComponent,
    // UserHomeComponent,
    // UserEditComponent,
    // ViewAllOrdersComponent
    // CarListComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    //AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    JwPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
    // AdminProductsModule,
    // ProductsModule,
    // AdminOrdersModule
    ],
  providers: [
    ProductService, 
    UserService, 
    AdminService, 
    AuthGuard, 
    AdminGuard, 
    CarService, 
    DataService, 
    CarMarkService
    ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
