import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart'; // Replace with your actual API URL
  

  cartItems = new BehaviorSubject<number>(0); // Tracks cart item count
  cartItemsCount$ = this.cartItems.asObservable(); // Observable for UI binding
  
  constructor(private http: HttpClient) {}

  updateCartItemsCount(count: number): void {
    this.cartItems.next(count); // Update count in BehaviorSubject
  }

  addProductToCart(productId: string, quantity: number, price : number): Observable<any> {
    return this.http.post(this.apiUrl, { productId, quantity, price });
  }

  getMyCartItems(){
return this.http.get(this.apiUrl);
  }


  // Remove product from cart
  removeFromCart(productId: number) {
   return this.http.delete(`${this.apiUrl}/${productId}`)
  }


  // Quantity Update Into cart
  updateQuantity(productId: number, payload: { quantity: number }) {
    return this.http.put(`${this.apiUrl}/${productId}`, payload);
  }

  // Clear cart after checkout
  clearCart() {
    
  }
}
