import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: Product[];

  readonly rootUrl = 'http://localhost:52866/api';
  // public API = 'http://localhost:8080/api';
  // public SUGARLEVELS_API = `${this.API}/sugarlevels`;

  constructor(private http: HttpClient) { }


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.rootUrl + '/products');
  }

  get(id: string) {
    return this.http.get(`${this.rootUrl + '/products'}/${id}`);
  }

  // getBySearch(key: string) {
  //   return this.http.get(`${this.rootUrl + '/products/GetProductsBySearch'}/${key}`);
  // }

  update(product: Product): Observable<Product> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Product>(this.rootUrl + '/products/' + product.Id, product, httpOptions);
  }

  save(product: Product): Observable<Product> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Product>(this.rootUrl + '/products', product, httpOptions);
  }

  remove(id: string) {
    console.log('id from remove function in service: ' + id);
    return this.http.delete(`${this.rootUrl + '/products'}/${id}`);
  }
}
