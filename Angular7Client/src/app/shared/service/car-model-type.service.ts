import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModelType } from '../model/car-model-type.model';

@Injectable({
  providedIn: 'root'
})
export class CarModelTypeService {

  carModelType: CarModelType;
  readonly rootUrl = 'http://localhost:52866';
  progress: number;


  constructor(private http: HttpClient) { }

  saveCarModelType(carModelType: CarModelType) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/carmodeltypes/', carModelType, httpOptions);
  }

  getAllCarModelTypes(): Observable<CarModelType[]> {  
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<CarModelType[]>(this.rootUrl + '/api/carmodeltypes', { headers: reqHeader });
  }  

  getCarModelTypeIdModelType(carModelTypeId: number): Observable<CarModelType[]> {  
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<CarModelType[]>(this.rootUrl + '/api/carmodeltypes/getcarmodeltypesbycarmodeltypeidsearch/' + carModelTypeId, { headers: reqHeader });
  }  

  putCarModelType(carModelType: CarModelType) {  
    console.log(carModelType);
    return this.http.put(this.rootUrl + '/api/carmodeltypes/' + carModelType.Id, carModelType);
  }  

  removeCarModelType(id: number) {
    return this.http.delete(this.rootUrl + '/api/carmodeltypes/' + id);
  }
}
