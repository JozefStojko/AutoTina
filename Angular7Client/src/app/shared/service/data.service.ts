import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private adminSignIn = new BehaviorSubject('');
  currentAdmin = this.adminSignIn.asObservable();

  constructor() { }

  adminSignInFunction(admin: string) {
    this.adminSignIn.next(admin);
  }
}
