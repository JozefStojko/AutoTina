import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
  }
)
export class Globals {
  // public adminSingIn: boolean = false;
  // public adminSingIn: false;  //ovo ide ako se samo cita kao konstanta
  public adminSingIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setAdminSingIn(isAdminSingIn): Observable<boolean> {
    this.adminSingIn.next(isAdminSingIn);
    return this.adminSingIn;
   }
}
