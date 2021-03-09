import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator/';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:52866';
  public user: User;
  public itsUserSignIn: BehaviorSubject<boolean>;


  constructor(private http: HttpClient) {
    this.itsUserSignIn = new BehaviorSubject<boolean>(false);
   }

  userRegister(user: User) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' }) };
    return this.http.post(this.rootUrl + '/api/Account/Register', user, httpOptions);
  }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
   return this.http.get(this.rootUrl + '/api/GetUserClaims');
  }

  // Ovo ne radi pošto je Id usera string a ne integer, treba promeniti tip ID Usera u modelu na int
  putUser(user: User) {  
    console.log(user);
    return this.http.put(this.rootUrl + '/api/account/' + user.Id, user);
  }  
  
  setValue(newValue): void {
    this.itsUserSignIn.next(newValue);
  }

  getValue(): Observable<boolean> {
    return this.itsUserSignIn.asObservable();
  }


}
