import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.isAuthenticated()){
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getToken()}`                  
                }
            });
        }else{
            console.log('isAuthenticated false --> ' + this.authService.getToken());
        }
        console.log('Intercepted HTTP call**************************************************************');
        
        console.log(req);
        
        //const copiedReq = req.clone({ params: req.params.set('auth', this.authService.getToken()) });
        return next.handle(req);
    }
}