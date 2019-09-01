import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('showActions') showActions = true;
  @Input('shopping-cart') cart; 

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCart.addToCart(this.product);
  }

}
