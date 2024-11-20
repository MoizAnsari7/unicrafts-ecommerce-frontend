import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders: any[] = [];

  constructor() {}

  // Add a new order
  placeOrder(order: any): void {
    this.orders.push(order);
  }

  // Get all orders
  getOrders(): any[] {
    return this.orders;
  }
}
