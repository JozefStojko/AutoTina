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
  progress: number;


  constructor(private http: HttpClient) { }

  saveCarType(carType: CarType) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/carmodels/', carType, httpOptions);
  }

  getAllCarTypes(): Observable<CarType[]> {  
    return this.http.get<CarType[]>(this.rootUrl + '/api/carmodels');
  }  


}
