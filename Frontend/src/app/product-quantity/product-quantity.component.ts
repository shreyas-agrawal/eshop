import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shopping-cart') cart; 

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCart.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCart.removeFromCart(this.product);
  }

}
