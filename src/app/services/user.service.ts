import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // replace with your API base URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData);
  }

  getOrderHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  addAddress(address: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/address`, address);
  }

  updateAddress(addressId: string, address: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/address/${addressId}`, address);
  }

  deleteAddress(addressId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/address/${addressId}`);
  }
}
