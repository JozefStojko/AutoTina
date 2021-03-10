import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productList: Product[];
  public fixProductList: Product[];
  [x: string]: any;
  public product: Product;
  private readonly rootUrl = 'http://localhost:52866';
  public progress: number;

  constructor(private http: HttpClient) { }


  // getAll(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.rootUrl + '/api/products');
  // }

  getAll(): Observable<Product[]> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<Product[]>(this.rootUrl + '/api/products', { headers: reqHeader });
  }


  get(id: string) {
    return this.http.get(`${this.rootUrl + 'api/products'}/${id}`);
  }


  saveProduct(
    carMarkSelect: number,
    carTypeSelect: number,
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
    var formProduct: FormData = new FormData();
    formProduct.set('ProductTypeId', JSON.stringify(productTypeSelect));
    formProduct.set('CarModelTypeId', JSON.stringify(carModelTypeSelect));
    formProduct.set('CarModelTypeEngineId', JSON.stringify(carModelTypeEngineSelect));
    formProduct.set('CarTypeId', JSON.stringify(carTypeSelect));
    formProduct.set('CarMarkId', JSON.stringify(carMarkSelect));
    formProduct.set('CatalogNumber', catalogNumber);
    formProduct.set('ProductName', productName);
    formProduct.set('OnLager', JSON.stringify(onLager));
    formProduct.set('Price', JSON.stringify(price));
    formProduct.set('Description', description);
    formProduct.set('ComparativeNumbers', comparativeNumbers);
    formProduct.set('Image', fileToUpload, fileToUpload.name);
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



  putProduct(
    productId: number,
    carMarkSelect: number,
    carTypeSelect: number,
    productTypeSelect: number, 
    carModelTypeSelect: number, 
    carModelTypeEngineSelect: number, 
    catalogNumber: string, 
    productName: string, 
    onLager: number, 
    price: number, 
    description: string, 
    comparativeNumbers: string,
    fileToUpload: File) {  
    const formProduct: FormData = new FormData();
    formProduct.set('ProductId', JSON.stringify(productId));
    formProduct.set('ProductTypeId', JSON.stringify(productTypeSelect));
    formProduct.set('CarModelTypeId', JSON.stringify(carModelTypeSelect));
    formProduct.set('CarTypeId', JSON.stringify(carTypeSelect));
    formProduct.set('CarMarkId', JSON.stringify(carMarkSelect));
    formProduct.set('CarModelTypeEngineId', JSON.stringify(carModelTypeEngineSelect));
    formProduct.set('CatalogNumber', catalogNumber);
    formProduct.set('ProductName', productName);
    formProduct.set('OnLager', JSON.stringify(onLager));
    formProduct.set('Price', JSON.stringify(price));
    formProduct.set('Description', description);
    formProduct.set('ComparativeNumbers', comparativeNumbers);
    formProduct.set('ProductImage', fileToUpload, fileToUpload.name);
    return this.http.put(this.rootUrl + '/api/products/' + productId, formProduct);
  }  

  putProductNoImage(
    productId: number,
    carMarkSelect: number,
    carTypeSelect: number,
    productTypeSelect: number, 
    carModelTypeSelect: number, 
    carModelTypeEngineSelect: number, 
    catalogNumber: string, 
    productName: string, 
    onLager: number, 
    price: number, 
    description: string, 
    comparativeNumbers: string,
    productImage: string) {  
    const formProduct: FormData = new FormData();
    formProduct.set('ProductId', JSON.stringify(productId));
    formProduct.set('ProductTypeId', JSON.stringify(productTypeSelect));
    formProduct.set('CarModelTypeId', JSON.stringify(carModelTypeSelect));
    formProduct.set('CarTypeId', JSON.stringify(carTypeSelect));
    formProduct.set('CarMarkId', JSON.stringify(carMarkSelect));
    formProduct.set('CarModelTypeEngineId', JSON.stringify(carModelTypeEngineSelect));
    formProduct.set('CatalogNumber', catalogNumber);
    formProduct.set('ProductName', productName);
    formProduct.set('OnLager', JSON.stringify(onLager));
    formProduct.set('Price', JSON.stringify(price));
    formProduct.set('Description', description);
    formProduct.set('ComparativeNumbers', comparativeNumbers);
    formProduct.set('ProductImage', JSON.stringify(productImage));
    console.log(formProduct);
    return this.http.put(this.rootUrl + '/api/products/' + productId, formProduct);
  }  


  remove(id: number) {
    console.log('id from remove function in service: ' + id);
    return this.http.delete(this.rootUrl + '/api/products/' + id );
  }


}
