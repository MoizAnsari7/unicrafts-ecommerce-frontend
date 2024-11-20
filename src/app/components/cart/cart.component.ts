import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  // Calculate total amount
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // Remove product from cart
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Refresh cart
    this.calculateTotal();
  }

  // Checkout and clear cart
  checkout() {
    alert('Thank you for your purchase!');
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalAmount = 0;
  }


  incrementQuantity(item: any) {
    item.quantity += 1;
    this.calculateTotal();
  }
  
  // Decrement quantity
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotal();
    } else {
      this.removeItem(item.id); // Remove if quantity reaches 0
    }
  }
}
