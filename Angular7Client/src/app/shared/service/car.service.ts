import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator/';
import { Car } from '../model/car.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  car: Car;
  readonly rootUrl = 'http://localhost:52866';
  constructor(private http: HttpClient) { }


  //ova metoda RADI
  saveCar(car: Car) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/cars/', car, httpOptions);
  }

  getAllCars(): Observable<Car[]> {  
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<Car[]>(this.rootUrl + '/api/cars', { headers: reqHeader });  
  }  

  putCar(car: Car) {  
    return this.http.put(this.rootUrl + '/api/cars/' + car.Id, car);
  }  

  removeCar(id: number) {
    return this.http.delete(this.rootUrl + '/api/cars/' + id);
  }

}
