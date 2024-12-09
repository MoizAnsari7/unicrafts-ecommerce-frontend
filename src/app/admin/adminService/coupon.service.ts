import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private apiUrl = 'http://localhost:3000/api/coupon';

  constructor(private http: HttpClient) {}

  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCoupon(couponData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/coupons`, couponData);
  }

  updateCoupon(couponId: string, couponData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/coupons/${couponId}`, couponData);
  }

  deleteCoupon(couponId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/coupons/${couponId}`);
  }

  applyCoupon(code:any, totalAmount:any){
    console.log(code,totalAmount);
    const data = { code, totalAmount}
    return this.http.post(`${this.apiUrl}/apply`,data);
  }
}
