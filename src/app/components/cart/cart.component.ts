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
      console.log("cart items ressssss",res);
      this.cartItems = res.items;
      this.totalAmount = res.total;
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
  removeItem(item: any) {
    this.cartService.removeFromCart(item.productId).subscribe((res:any)=>{
      this.notiflixService.warning(res.message);
this.getCartItems()
    })
    // this.calculateTotal();
  }

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

  updateQuantity(item: any, action: 'increment' | 'decrement') {
    let quantity = item.quantity;
  
    // Adjust quantity based on the action
    if (action === 'increment') {
      quantity += 1;
    } else if (action === 'decrement') {
      quantity -= 1;
    }
  
    // Remove item if quantity is 0
    if (quantity <= 0) {
      this.cartService.removeFromCart(item.productId).subscribe(
        (res: any) => {
          this.notiflixService.success('Item removed successfully:');
          this.getCartItems(); // Refresh the cart items
        },
        (error) => {
          this.notiflixService.error('Error removing item:');
        }
      );
      return; // Exit the method early since item is removed
    }
  
    // Update the quantity
    const payload = { quantity }; // Create payload object
    this.cartService.updateQuantity(item.productId, payload).subscribe(
      (res: any) => {
        this.notiflixService.success('Quantity updated successfully:');
        this.getCartItems(); // Refresh the cart items
      },
      (error) => {
        this.notiflixService.error('Error updating quantity:');
      }
    );
  }
  
 

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(item.id);
    }
  }

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
