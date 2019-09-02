import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  cart$;

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
