import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Shop } from '../model/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public shopList: Shop[] = [];
  readonly rootUrl = 'http://localhost:52866';
  private orders: string;


  constructor(
    injector: Injector,
    private http: HttpClient
  ) { }

  orderItems(order: Shop){
    console.log(order);
    this.orders = JSON.parse(localStorage.getItem("shoppingBasket" || "[]"));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/Accountings/', order, httpOptions);
    }

  //   orderItems(mailMessage: any){

  //   let headers = new HttpHeaders();

  //   headers = headers.set('Accept', 'application/json');

  //   if (mailMessage) {
  //     headers = headers.set('Content-Type', 'application/json');
  //   }

  //   this.http.post(this.rootUrl + '/api/email/sendmail', mailMessage, {
  //     headers
  //   }).subscribe(result => {
  //     console.log("Email sent!");
  //   });

  // }
}
