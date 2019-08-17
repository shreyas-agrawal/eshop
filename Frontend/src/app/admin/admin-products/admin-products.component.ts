import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products;

  constructor(private productService: ProductService) { 
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts(){
    this.productService.getAllProducts().valueChanges().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }

}