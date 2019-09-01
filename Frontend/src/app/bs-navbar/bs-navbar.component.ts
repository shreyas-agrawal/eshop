import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  cart$;

  constructor(
    public auth: AuthService,
    private shoppingCart: ShoppingCartService
    ) {}

  async ngOnInit() {
    this.cart$ = (await this.shoppingCart.getCart());
  }

  logout() {
    this.auth.logout();
  }

}
