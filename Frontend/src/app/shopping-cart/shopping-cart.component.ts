import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    console.log('cart', this.cart$);
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
