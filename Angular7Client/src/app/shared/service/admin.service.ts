import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private itsAdminSignIn: BehaviorSubject<boolean>;
  // private adminSignIn = new BehaviorSubject('');
  // currentAdmin = this.adminSignIn.asObservable();
  // public itsAdminSignIn: boolean;

  constructor() {
    this.itsAdminSignIn = new BehaviorSubject<boolean>(false);
   }

  // adminSignInFunction(admin: string) {
  //   this.adminSignIn.next(admin);
  // }
  setValue(newValue): void {
    this.itsAdminSignIn.next(newValue);
  }

  getValue(): Observable<boolean> {
    return this.itsAdminSignIn.asObservable();
  }

}
