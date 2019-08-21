import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  categories;
  product = {};

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService) {
    this.productService.getAllProducts().snapshotChanges().subscribe((products) => {
      products.forEach(p => {
        this.product = p.payload.val();
        this.product['key'] = p.key;
        this.products.push(this.product);
      });
    });
    this.categoryService.getCategories().snapshotChanges().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  ngOnInit() {
  }

}
