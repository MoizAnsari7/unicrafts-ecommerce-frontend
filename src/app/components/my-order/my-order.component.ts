import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/order.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.orders = this.ordersService.getOrders(); // Fetch orders

    console.log("this order", this.orders);
    
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
    alert(`Tracking details for Order #${orderId} are unavailable right now.`);
  }

  cancelOrder(orderId: string): void {
    const order = this.orders.find((o) => o.id === orderId);
    if (order && order.status !== 'Cancelled') {
      order.status = 'Cancelled';
      alert(`Order #${orderId} has been cancelled.`);
    } else {
      alert(`Order #${orderId} is already cancelled.`);
    }
  }
}
