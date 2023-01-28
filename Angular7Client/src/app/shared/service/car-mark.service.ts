import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator/';
import { CarMark } from '../model/carMark.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarMarkService {
  carMark: CarMark;
  readonly rootUrl = 'http://localhost:52866';
  progress: number;

  constructor(private http: HttpClient) { }



  // ovo radi bez progress bar
  saveCarMark(mark: string, fileToUpload: File) {
    var formCarMark: FormData = new FormData();
    formCarMark.set('mark', JSON.stringify(mark));
    formCarMark.set('image', fileToUpload, fileToUpload.name);
    return this.http.post(this.rootUrl + '/api/carmarks/', formCarMark, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event => this.getEventMessage(event, formCarMark)),
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
        return `File "${formData.get('image').name}" surprising upload event: ${event.type}.`;
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

      // i ovo ide za progress bar
  private apiResponse(event) {
    return event.body;
  }


  getAllCarMarks(): Observable<CarMark[]> {  
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get<CarMark[]>(this.rootUrl + '/api/carmarks', { headers: reqHeader });
  }  


  putCarMark(carMarkId: string, markName:string, fileToUpload: File) {  
    const formData: FormData = new FormData();
    formData.append('carMarkId', JSON.stringify(carMarkId));
    formData.append('markName', JSON.stringify(markName));
    formData.append('markImage', fileToUpload, fileToUpload.name);
    return this.http.put(this.rootUrl + '/api/carmarks/' + carMarkId, formData);
  }  

  putCarMarkNoImage(carMarkId: string, markName:string, markImage: string) {  
    const formData: FormData = new FormData();
    formData.append('carMarkId', JSON.stringify(carMarkId));
    formData.append('markName', JSON.stringify(markName));
    formData.append('markImage', JSON.stringify(markImage));
    return this.http.put(this.rootUrl + '/api/carmarks/' + carMarkId, formData);
  }  


  removeCarMark(id: string) {
    return this.http.delete(this.rootUrl + '/api/carmarks/' + id);
  }

}


