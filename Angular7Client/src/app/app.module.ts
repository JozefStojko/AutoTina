import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
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
import { CarService } from './shared/service/car.service';
import { DataService } from './shared/service/data.service';
import { CarMarkService } from './shared/service/car-mark.service';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './framework/home/home.component';
import { FooterComponent } from './framework/footer/footer.component';
import { NavComponent } from './framework/nav/nav.component';
import { JwPaginationModule } from 'jw-angular-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    JwPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
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
