import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  filteredProducts = [];
  product = {};

  cart;
  subscription: Subscription;

  queryCategory;

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCart: ShoppingCartService) {
    this.productService.getAllProducts().snapshotChanges().subscribe((products) => {
      products.forEach(p => {
        this.product = p.payload.val();
        this.product['key'] = p.key;
        this.products.push(this.product);
      });

      this.route.queryParamMap.subscribe(params => {
        console.log('param', params);
        this.queryCategory = params.get('category');
        this.filteredProducts = (this.queryCategory) ?
                                this.products.filter(p => p.category === this.queryCategory) :
                                this.products;
      });
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
