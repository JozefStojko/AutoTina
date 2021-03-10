import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PartType } from '../model/part-type.model';
import 'rxjs/operator/';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class PartTypeService {
  [x: string]: any;
  partType: PartType;
  readonly rootUrl = 'http://localhost:52866';
  progress: number;


  constructor(private http: HttpClient) { }

  savePartType(productType: string, fileToUpload: File) {
    var formProductType: FormData = new FormData();
    formProductType.set('productTypeName', productType);
    formProductType.set('productTypeImage', fileToUpload, fileToUpload.name);
    return this.http.post(this.rootUrl + '/api/producttypemodels/', formProductType, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event => this.getEventMessage(event, formProductType)),
        catchError(this.handleError)
    );
  }


    //ovo ide za progress bar
    private getEventMessage(event: HttpEvent<any>, formData) {

      switch (event.type) {
        case HttpEventType.UploadProgress:
          return this.fileUploadProgress(event);
      break;
        case HttpEventType.Response:
          return this.apiResponse(event);
      break;
        default:
          return `File "${formData.get('productTypeImage').name}" surprising upload event: ${event.type}.`;
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
  

  getAllPartTypes(): Observable<PartType[]> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
     return this.http.get<PartType[]>(this.rootUrl + '/api/producttypemodels', { headers: reqHeader });
  }  

  putPartType(partTypeId: string, partTypeName:string, fileToUpload: File) {  
    const formData: FormData = new FormData();
    formData.append('productTypeId', partTypeId);
    formData.append('productTypeName', JSON.stringify(partTypeName));
    formData.append('productTypeImage', fileToUpload, fileToUpload.name);
    return this.http.put(this.rootUrl + '/api/producttypemodels/' + partTypeId, formData);
  }  

  putPartTypeNoImage(partTypeId: string, partTypeName:string, partTypeImage: string) {  
    const formData: FormData = new FormData();
    formData.append('productTypeId', partTypeId);
    formData.append('productTypeName', JSON.stringify(partTypeName));
    formData.append('productTypeImage', JSON.stringify(partTypeImage));
    return this.http.put(this.rootUrl + '/api/producttypemodels/' + partTypeId, formData);
  }  


  removePartType(id: string) {
    return this.http.delete(this.rootUrl + '/api/producttypemodels/' + id);
  }



}
