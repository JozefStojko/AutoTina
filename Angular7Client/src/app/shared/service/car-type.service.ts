import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarType } from '../model/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {
  carType: CarType;
  readonly rootUrl = 'http://localhost:52866';
  progress: number;


  constructor(private http: HttpClient) { }
}
