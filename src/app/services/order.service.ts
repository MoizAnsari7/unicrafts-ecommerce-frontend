import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/order'; 

  constructor(private http: HttpClient) {}

  // Add a new order
  placeOrder(order:any) {
   return this.http.post(`${this.apiUrl}/placeOrder`, order );
  }

  // Get all orders
  getOrders(){
    
  }
}
