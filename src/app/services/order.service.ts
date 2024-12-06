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
   return this.http.post(`${this.apiUrl}/placeOrders`, order );
  }

  // Get all orders
  getOrders(){
    return this.http.get(`${this.apiUrl}/orders`);
  }

  cancelOrder(orderId:any){
    return this.http.delete(`${this.apiUrl}/${orderId}`);
  }

  clearCart() {
    return this.http.delete(`${this.apiUrl}/clearCart`);
  }
}
