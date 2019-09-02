import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders = [];
  order = {};
  user$;
  username: string;

  constructor(
    private orderService: OrderService,
    private auth: AuthService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      console.log('orders', orders);
      orders.forEach(item => {
        // console.log('order', item);
        this.order = item.payload.val();
        this.order['key'] = item.key;
        this.orders.push(this.order);
      });
      console.log(this.orders);
    });
  }

  getDate(time){
    const date = new Date(time);
    return date.toString().substring(4, 15);
    // return date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear();
  }

}
