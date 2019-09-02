import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders = [];
  order = {};
  user$;
  userId: string;

  constructor(
    private orderService: OrderService,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.uid;

      this.orderService.getOrdersByUser(this.userId).subscribe(orders => {
        console.log('orders', orders);
        orders.forEach(item => {
          // console.log('order', item);
          this.order = item.payload.val();
          this.order['key'] = item.key;
          this.orders.push(this.order);
        });
        console.log(this.orders);
      });

    });
  }

  getDate(time){
    const date = new Date(time);
    return date.toString().substring(4, 15);
    // return date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear();
  }
}
