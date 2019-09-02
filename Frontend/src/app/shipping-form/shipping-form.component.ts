import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('shopping-cart') cart;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService,
    private route: Router) { }

  shippingForm;
  userId;
  subscription: Subscription;

  async ngOnInit() {
    this.shippingForm = new FormGroup({
      name: new FormControl(''),
      line1: new FormControl(''),
      line2: new FormControl(''),
      city: new FormControl('')
    });

    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shippingForm.value, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.route.navigate(['/order-success/', result.key]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
