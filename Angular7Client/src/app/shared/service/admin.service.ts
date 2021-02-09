import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from '../model/admin.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly rootUrl = 'http://localhost:52866';
  private itsAdminSignIn: BehaviorSubject<boolean>;
  public admin: Admin;
  // private adminSignIn = new BehaviorSubject('');
  // currentAdmin = this.adminSignIn.asObservable();
  // public itsAdminSignIn: boolean;

  constructor (
    private http: HttpClient
  ){
    this.itsAdminSignIn = new BehaviorSubject<boolean>(false);
   }

  // adminSignInFunction(admin: string) {
  //   this.adminSignIn.next(admin);
  // }

  adminAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
    return this.http.get(this.rootUrl + '/api/GetUserClaims');
   }

   putAdmin(admin: Admin) {  
   return this.http.put(this.rootUrl + '/api/Account/' + admin.Id, admin);
  }  


  setValue(newValue): void {
    this.itsAdminSignIn.next(newValue);
  }

  getValue(): Observable<boolean> {
    return this.itsAdminSignIn.asObservable();
  }

}
