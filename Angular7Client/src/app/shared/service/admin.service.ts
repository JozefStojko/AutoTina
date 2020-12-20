import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSignIn = new BehaviorSubject('');
  currentAdmin = this.adminSignIn.asObservable();
  itsAdminSignIn = false;

  constructor() { }

  adminSignInFunction(admin: string) {
    this.adminSignIn.next(admin);
  }


}
