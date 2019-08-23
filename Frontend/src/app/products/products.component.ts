import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  filteredProducts = [];
  product = {};

  queryCategory;

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.productService.getAllProducts().snapshotChanges().subscribe((products) => {
      products.forEach(p => {
        this.product = p.payload.val();
        this.product['key'] = p.key;
        this.products.push(this.product);
      });

      this.route.queryParamMap.subscribe(params => {
        console.log('param', params);
        this.queryCategory = params.get('category');
        //console.log('ger', this.queryCategory);
        this.filteredProducts = (this.queryCategory) ? 
                                this.products.filter(p => p.category === this.queryCategory) : 
                                this.products;
      });
    });
  }

  ngOnInit() {

  }
}
