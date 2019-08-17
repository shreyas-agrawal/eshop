import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFireList } from '@angular/fire/database';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router) {
    userService.getCategories().valueChanges().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  ngOnInit() {
  }

  save(product){
    this.productService.addProduct(product);
    this.router.navigate(['/admin/products']);
  }

}
