import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
          }
        if (localStorage.getItem('adminToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('adminToken'))
            });
            return next.handle(clonedreq).pipe(
                tap(
                succ => { },
                err => {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/home');
                      }
                })
                );
        } else {
            this.router.navigateByUrl('/users/admin-home');
        }
    }
}
