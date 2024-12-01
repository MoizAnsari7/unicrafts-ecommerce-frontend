import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from 'src/app/services/order.service';
import { NotiflixService } from 'src/app/services/notiflix.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any;
  totalAmount: number = 0;

  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private notiflixService : NotiflixService
  ) {}

  ngOnInit() {
    // this.calculateTotal();
    this.getCartItems();
  }


  getCartItems(){
    this.cartService.getMyCartItems().subscribe((res:any)=>{
      console.log("ressssss",res.items);
      this.cartItems = res.items;
    })
  }


  // Calculate total amount
  // calculateTotal() {
  //   this.totalAmount = this.cartItems.reduce(
  //     (sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity,
  //     0
  //   );
  // }

  // Calculate total price
  // getTotal(): any {
  //   return this.cartItems.reduce(
  //     (total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity,
  //     0
  //   );
  // }

  // Remove product from cart
  // removeItem(productId: any) {
  //   this.cartService.removeFromCart(productId);
  //   this.cartItems = this.cartService.getCartItems(); // Refresh cart
  //   this.calculateTotal();
  //   this.notiflixService.warning('Item removed from cart!');
  // }

  // Checkout and clear cart
  // checkout(): void {
  //   if (this.cartItems.length === 0) {
  //     this.notiflixService.info('Cart is empty!');
  //     return;
  //   }

  //   const newOrder = {
  //     id: 'ORD' + Math.floor(100000 + Math.random() * 900000),
  //     date: new Date(),
  //     status: 'Processing',
  //     products: [...this.cartItems],
  //     total: this.getTotal(),
  //   };

  //   this.ordersService.placeOrder(newOrder);
  //   this.cartItems = []; // Clear cart after checkout
  //   this.notiflixService.success('Order placed successfully!');
  //   this.clearCart();
  // }

  // incrementQuantity(item: any) {
  //   item.quantity += 1;
  //   this.calculateTotal();
  // }

  // decrementQuantity(item: any) {
  //   if (item.quantity > 1) {
  //     item.quantity -= 1;
  //     this.calculateTotal();
  //   } else {
  //     this.removeItem(item.id);
  //   }
  // }

  clearCart() {
    this.cartItems = [];
  }

  showToastNotification(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
