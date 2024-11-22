import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private isToken = new BehaviorSubject<boolean>(false); // Tracks auth state
  isAuthenticated$ = this.isToken.asObservable(); // Expose as observable for components


  private apiUrl = 'http://localhost:3000/api/users'; // replace with your API base URL

  constructor(private http: HttpClient, ) {
    this.tokenCheck();
  }


  ngOnInit(): void {
    this.tokenCheck();
  }


  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUserProfile(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profile, {
      headers: this.getAuthHeaders(),
    });
  }

  uploadProfilePicture(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-profile-picture`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }




  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response: any) => {
        const token = response.token; // Assuming the API returns a token
        localStorage.setItem('token', token);
        this.tokenCheck(); // Trigger state update
      })
    );
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

  getAddresses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/addresses`);
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


logout(){
  localStorage.removeItem('token');
  this.isToken.next(false);
}


tokenCheck() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  this.isToken.next(isAuthenticated);
  if (token) {
    
    try {
      const decoded: any = jwt_decode.jwtDecode(token);
      console.log('Decoded Token:', decoded);

      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        console.log('Token expired, logging out user...');
        // User logout logic
        localStorage.removeItem('token');

        this.isToken.next(false);
        // Optional: Clear other user-related data if stored
        localStorage.removeItem('user'); // Example: Custom user data
        
        // Redirect user to login page
        window.location.href = '/login';
        
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.log('No token found in localStorage.');
  }
}


}
