import { Component, OnInit } from '@angular/core';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { OrdersService } from 'src/app/services/order.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  
})
export class MyOrderComponent implements OnInit {
  orders: any[] = [];
  isLoading :boolean=true;

  constructor(private ordersService: OrdersService, private notiflixService : NotiflixService) {}

  ngOnInit(): void {
    setTimeout(()=>{
      this.getMyOrders();
    },1000)
     }
  

     getMyOrders() {
      this.ordersService.getOrders()
      .pipe(
        map((res: any) => res.orders) // Extract 'orders' array from the API response
      )
      .subscribe({
        next: (orders: any[]) => {
          this.orders = orders;
          this.isLoading = false;
          console.log('Orders fetched successfully:', this.orders);
        },
        error: (error) => {
          console.error('Failed to fetch orders:', error);
          this.notiflixService.error('Error fetching orders');
        }
      });
    }
    
    




  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'bg-success';
      case 'Shipped':
        return 'bg-info';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  trackOrder(orderId: string): void {
    this.notiflixService.warning(`Tracking details for Order #${orderId} are unavailable right now.`);
  }

  cancelOrder(orderId: string): void {
    this.ordersService.cancelOrder(orderId).subscribe((res:any)=>{
      this.notiflixService.success(`${res.message} for #${orderId}`);
      this.getMyOrders();
    })
  }
}
