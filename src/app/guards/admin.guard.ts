import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt_decode.jwtDecode(token);
        if (decoded.role === 'admin') {
          return true; // Admin allowed
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    // Redirect to login if not admin
    this.router.navigate(['/login']);
    return false;
  }
}
