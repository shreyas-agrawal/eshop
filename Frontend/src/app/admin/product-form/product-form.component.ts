import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFireList } from '@angular/fire/database';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories = [];
  product = {};
  category = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
    categoryService.getCategories().snapshotChanges().subscribe((categories) => {
      categories.forEach(c => {
        this.category = c.payload.val();
        this.category['key'] = c.key;
        this.categories.push(this.category);
        // console.log(this.categories);
      })
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).snapshotChanges().take(1).subscribe(p => {
        this.product = p.payload.val();
        console.log('product', this.product);
      });
    }
  }

  ngOnInit() {
  }

  save(product){
    if(this.id){
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.addProduct(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete the product')) {
      return;
    }
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

}
