import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartType } from '../model/part-type.model';

@Injectable({
  providedIn: 'root'
})
export class PartTypeService {
  partType: PartType;
  readonly rootUrl = 'http://localhost:52866';
  progress: number;


  constructor(private http: HttpClient) { }

  savePartType(partType: PartType) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.rootUrl + '/api/producttypemodels/', partType, httpOptions);
  }

  getAllPartTypes(): Observable<PartType[]> {  
    return this.http.get<PartType[]>(this.rootUrl + '/api/producttypemodels');
  }  

  putPartType(partType: PartType) {  
    console.log(partType);
    return this.http.put(this.rootUrl + '/api/producttypemodels/' + partType.Id, partType);
  }  

  removePartType(id: string) {
    return this.http.delete(this.rootUrl + '/api/producttypemodels/' + id);
  }



}
