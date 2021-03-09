import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModelTypeEngine } from '../model/car-model-type-engine.model';

@Injectable({
  providedIn: 'root'
})
export class CarModelTypeEngineService {

  carModelTypeEngine: CarModelTypeEngine;
  readonly rootUrl = 'http://localhost:52866';


  constructor(private http: HttpClient) { }

  saveCarModelTypeEngine(carModelTypeEngine: CarModelTypeEngine) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/carmodeltypeengines/', carModelTypeEngine, httpOptions);
  }

  getAllCarModelTypeEngines(): Observable<CarModelTypeEngine[]> {  
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<CarModelTypeEngine[]>(this.rootUrl + '/api/carmodeltypeengines', { headers: reqHeader });
  }  


  getCarModelTypeEngines(carModelTypeEngineId: number): Observable<CarModelTypeEngine[]> {  
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<CarModelTypeEngine[]>(this.rootUrl + '/api/carmodeltypeengines/GetCarModelTypeEnginesByCarModelTypeEngineIdSearch/' + carModelTypeEngineId, { headers: reqHeader });
  }  

  putCarModelTypeEngine(carModelTypeEngine: CarModelTypeEngine) {  
    console.log(carModelTypeEngine);
    return this.http.put(this.rootUrl + '/api/carmodeltypeengines/' + carModelTypeEngine.Id, carModelTypeEngine);
  }  

  removeCarModelTypeEngine(id: number) {
    console.log(id);
    return this.http.delete(this.rootUrl + '/api/carmodeltypeengines/' + id);
  }

}
