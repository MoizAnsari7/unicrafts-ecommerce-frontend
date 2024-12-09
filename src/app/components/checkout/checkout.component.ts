import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/admin/adminService/coupon.service';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { OrdersService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ] // Add your CSS here
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = []; // Holds cart items
  subtotal: number = 0; // Subtotal of items
  tax: number = 0; // Tax amount
  deliveryCharge: number = 50; // Fixed delivery charge
  totalAmount: number = 0; // Total payable amount
  orderPlaced: boolean = false;

  // Form fields for delivery address
  fullName: string = '';
  address: string = '';
  city: string = '';
  state : string ='';
  zipcode: string = '';
  phone: string = '';
  country: any = '';
  selectedPaymentMethod: string = 'payTm';

  couponCode: string = ''; // Coupon code entered by the user
  discount: number = 0; // Discount applied (if any)

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router,
    private notiflixService: NotiflixService,
    private couponService : CouponService,
    private userService : UserService
  ) {}

  ngOnInit(): void {
  this.loadCartData();
  this.getCouponList();
  this.getUserId();
  }


  // Load cart data from the CartService
  loadCartData(): void {
    this.cartService.getMyCartItems().subscribe(
      (data: any) => {
        this.cartItems = data.cart.items;
        console.log("from Checkout", this.cartItems);
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
        state: this.state, // Replace or let the user enter this
        zipcode: this.zipcode,
        country: this.country, // Replace or let the user enter this
        phone: this.phone,
      },
      paymentMethod: this.selectedPaymentMethod,
      total: this.totalAmount,
    };

    this.orderService.placeOrder(orderData).subscribe(
      (response :any) => {
        this.orderPlaced = true; // Show success message
        this.notiflixService.success('Order placed successfully!');
        setTimeout(()=>{
          this.router.navigate(['/my-order']); // Navigate to the orders page
        },5000)
        this.orderService.clearCart().subscribe();
      },
      (error:any) => {
        console.error('Error placing order:', error);
        alert('Failed to place the order. Please try again.');
      }
    );
  }


  applyCoupon(){
    this.couponService.applyCoupon(this.couponCode,this.totalAmount).subscribe((res:any)=>{
console.log("discountedTotal",res);
this.totalAmount = res.discountedTotal;
this.notiflixService.success(res.message);
// this.loadCartData();
this.display = 'block'
    },(err:any)=>{
      this.notiflixService.error(err.error.message); 
    })
  }

  display : any ='none'
couponList : any ;
currentUserId : any;

  getCouponList(){
    this.couponService.getCoupons().subscribe((res:any)=>{
console.log("coupon list", res.coupon);
this.couponList = res.coupon;
    })
  }


  isCouponApplied(couponCode: string): boolean {
    const coupon = this.couponList.find((c:any) => c.code === couponCode);
    return coupon ? coupon.usedBy.includes(this.currentUserId) : false;
  }

  getUserId(){
    this.userService.getUserProfile().subscribe((res:any)=>{
     this.currentUserId =  res.user._id;
    })
  }

}
