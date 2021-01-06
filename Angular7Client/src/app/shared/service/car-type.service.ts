import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarType } from '../model/car-type.model';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {
  carType: CarType;
  readonly rootUrl = 'http://localhost:52866';


  constructor(private http: HttpClient) { }

  saveCarType(carType: CarType) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/carmodels/', carType, httpOptions);
  }

  getAllCarTypes(): Observable<CarType[]> {  
    return this.http.get<CarType[]>(this.rootUrl + '/api/carmodels');
  }  

  getCarMarkIdTypes(carMarkId: number): Observable<CarType[]> {  
    return this.http.get<CarType[]>(this.rootUrl + '/api/carmodels/GetCarModelsByCarMarkIdSearch/' + carMarkId);
  }  

  putCarType(carType: CarType) {  
    console.log(carType);
    return this.http.put(this.rootUrl + '/api/carmodels/' + carType.Id, carType);
  }  

  removeCarType(id: string) {
    return this.http.delete(this.rootUrl + '/api/carmodels/' + id);
  }



}
