import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart'; // Replace with your actual API URL
  cartItems:any;
  constructor(private http: HttpClient) {}

  addProductToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, { productId, quantity });
  }

  getMyCartItems(){
return this.http.get(this.apiUrl);
  }

  // Get cart items
  getCartItems() {
    return this.cartItems;
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item:any) => item.id !== productId);
  }

  // Clear cart after checkout
  clearCart() {
    this.cartItems = [];
  }
}
