import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  // Add product to cart
  addToCart(product: any, quantity: number) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity if product already in cart
    } else {
      this.cartItems.push({ ...product, quantity });
    }
  }

  // Get cart items
  getCartItems() {
    return this.cartItems;
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  // Clear cart after checkout
  clearCart() {
    this.cartItems = [];
  }
}
