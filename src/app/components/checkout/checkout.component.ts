import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'], // Add your CSS here
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = []; // Holds cart items
  subtotal: number = 0; // Subtotal of items
  tax: number = 0; // Tax amount
  deliveryCharge: number = 50; // Fixed delivery charge
  totalAmount: number = 0; // Total payable amount

  // Form fields for delivery address
  fullName: string = '';
  address: string = '';
  city: string = '';
  zipcode: string = '';
  phone: string = '';
  selectedPaymentMethod: string = '';

  couponCode: string = ''; // Coupon code entered by the user
  discount: number = 0; // Discount applied (if any)

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
  // this.getCartDataIntoCheckout();
  this.loadCartData();
  }

  getCartDataIntoCheckout(){
    this.cartService.getMyCartItems().subscribe((res:any)=>{
      this.cartItems = res.cart.items;
      this.totalAmount = res.cart.total
      console.log("from Checkout", res);
      
    })
  }

  // Load cart data from the CartService
  loadCartData(): void {
    this.cartService.getMyCartItems().subscribe(
      (data: any) => {
        this.cartItems = data.cart.items;
        this.calculateTotals();
      },
      (error:any) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  // Calculate subtotal, tax, and total amounts
  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    this.tax = this.subtotal * 0.01; // Assuming a 10% tax rate
    this.totalAmount = this.subtotal + this.tax + this.deliveryCharge - this.discount;
  }

  // Apply a coupon code
  applyCoupon(): void {
    // Dummy logic for coupon validation
    if (this.couponCode === 'SAVE10') {
      this.discount = this.subtotal * 0.1; // 10% discount
      this.calculateTotals();
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code!');
    }
  }

  // Place the order
  placeOrder(): void {
    // Validate the delivery address and payment method
    if (!this.fullName || !this.address || !this.city || !this.zipcode || !this.phone) {
      alert('Please fill in all delivery details.');
      return;
    }
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const orderData = {
      items: this.cartItems,
      shippingAddress: {
        fullName: this.fullName,
        address: this.address,
        city: this.city,
        zipcode: this.zipcode,
        phone: this.phone,
      },
      paymentMethod: this.selectedPaymentMethod,
      total: this.totalAmount,
    };

    this.orderService.placeOrder(orderData).subscribe(
      (response :any) => {
        alert('Order placed successfully!');
        this.cartService.clearCart(); // Clear the cart after order placement
        this.router.navigate(['/orders']); // Navigate to the orders page
      },
      (error:any) => {
        console.error('Error placing order:', error);
        alert('Failed to place the order. Please try again.');
      }
    );
  }
}
