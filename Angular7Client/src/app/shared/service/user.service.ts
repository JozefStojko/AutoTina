import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator/';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:52866';
  public user: User;

  constructor(private http: HttpClient) { }

  userRegister(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(this.rootUrl + '/api/Account/Register', user, httpOptions)
    .pipe(catchError(err => {
      throw 'error from, details: ' + err;
  }));
  }


  // userRegister(user: User) {
  //   // const body: User = {
  //   //   UserName: user.UserName,
  //   //   Password: user.Password,
  //   //   Email: user.Email,
  //   //   FirstName: user.FirstName,
  //   //   LastName: user.LastName,
  //   //   Phone: user.Phone,
  //   //   City: user.City,
  //   //   ZipCode: user.ZipCode,
  //   //   Address: user.Address,
  //   //   IsAdmin: false
  //   // };
  //   console.log('ez a user a userRegister funkciobol: ', user);
  //   const reqHeader = new HttpHeaders({'No-Auth': 'True'});
  //   return this.http.post(this.rootUrl + '/api/Account/Register', user, {headers : reqHeader});
  // }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }



  getUserClaims() {
   return this.http.get(this.rootUrl + '/api/GetUserClaims');
  }

}
