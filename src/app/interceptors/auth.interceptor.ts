import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token'); // Retrieve the JWT token from storage
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Add the token to the header
      },
    });
  }
  return next.handle(req);
}
}
