import { Component, OnInit } from '@angular/core';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { OrdersService } from 'src/app/services/order.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private ordersService: OrdersService, private notiflixService : NotiflixService) {}

  ngOnInit(): void {
this.getMyOrders();
     }
  

  getMyOrders(){
    this.ordersService.getOrders().subscribe((res:any)=>{
      console.log("this order", res);
      this.orders = res
    })
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
