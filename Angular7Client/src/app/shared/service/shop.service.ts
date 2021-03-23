import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { throwError } from 'rxjs';
import { Shop } from '../model/shop.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public shopList: Shop[] = [];
  readonly rootUrl = 'http://localhost:52866';
  private orders: string;
  private order: Shop;


  constructor(
    injector: Injector,
    private http: HttpClient
  ) { }

  orderItems(){

    this.orders = JSON.parse(localStorage.getItem("shoppingBasket" || "[]"));
    console.log(this.orders);
    localStorage.removeItem("shoppingBasket" || "[]");
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Shop[]>(this.rootUrl + '/api/Accountings/', this.orders, httpOptions)
    .subscribe(data =>console.log(data),
    (error)=>console.log(error));
    }

}
