import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: Product[];
  [x: string]: any;
  product: Product;
  readonly rootUrl = 'http://localhost:52866';
  progress: number;

  constructor(private http: HttpClient) { }


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.rootUrl + '/api/products');
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

  saveProduct(
    productTypeSelect: number, 
    carModelTypeSelect: number, 
    carModelTypeEngineSelect: number, 
    catalogNumber: string, 
    productName: string, 
    onLager: number, 
    price: number, 
    fileToUpload: File,
    description: string, 
    comparativeNumbers: string) {
    // console.log(productTypeSelect, carModelTypeSelect, carModelTypeEngineSelect, catalogNumber, productName, onLager, price, fileToUpload, description, comparativeNumbers);
    var formProduct: FormData = new FormData();
    formProduct.set('ProductTypeId', JSON.stringify(productTypeSelect));
    formProduct.set('CarModelTypeId', JSON.stringify(carModelTypeSelect));
    formProduct.set('CarModelTypeEngineId', JSON.stringify(carModelTypeEngineSelect));
    formProduct.set('CatalogNumber', catalogNumber);
    formProduct.set('ProductName', productName);
    formProduct.set('OnLager', JSON.stringify(onLager));
    formProduct.set('Price', JSON.stringify(price));
    formProduct.set('Description', description);
    formProduct.set('ComparativeNumbers', comparativeNumbers);
    formProduct.set('Image', fileToUpload, fileToUpload.name);
    console.log(formProduct.getAll('ProductTypeId'));
    console.log(formProduct.getAll('CarModelTypeId'));
    console.log(formProduct.getAll('CarModelTypeEngineId'));
    console.log(formProduct.getAll('CatalogNumber'));
    console.log(formProduct.getAll('ProductName'));
    console.log(formProduct.getAll('OnLager'));
    console.log(formProduct.getAll('Description'));
    console.log(formProduct.getAll('Price'));
    console.log(formProduct.getAll('ComparativeNumbers'));
    console.log(formProduct.getAll('Image'));
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    // return this.http.post(this.rootUrl + '/api/products/', formProduct, httpOptions);

    return this.http.post(this.rootUrl + '/api/products/', formProduct, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event => this.getEventMessage(event, formProduct)),
        catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formProduct) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
    break;
      case HttpEventType.Response:
        return this.apiResponse(event);
    break;
      default:
        return `File "${formProduct.get('Image').name}" surprising upload event: ${event.type}.`;
    }
  }

  // i ovo ide za progress bar
  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

    // i ovo ide za prodress bar, ako ima neke greske
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

      // i ovo ide za prodress bar
  private apiResponse(event) {
    return event.body;
  }


  // save(product: Product): Observable<Product> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.post<Product>(this.rootUrl + '/products', product, httpOptions);
  // }

  remove(id: string) {
    console.log('id from remove function in service: ' + id);
    return this.http.delete(`${this.rootUrl + '/products'}/${id}`);
  }
}
