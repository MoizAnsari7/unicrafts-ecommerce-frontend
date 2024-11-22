import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt_decode.jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now(); // `exp` is in seconds, so multiply by 1000 for milliseconds
        if (isExpired) {
          console.warn('Token expired');
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      } catch (error) {
        console.error('Error decoding token:', error);
        this.router.navigate(['/login']);
        return false;
      }
    }
    console.warn('No token found');
    this.router.navigate(['/login']);
    return false;
  }
}
