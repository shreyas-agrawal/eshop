import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories = [];
  category = {};

  @Input('category') queryCategory;

  constructor(private categoryService: CategoryService) {
    categoryService.getCategories().snapshotChanges().subscribe((categories) => {
      categories.forEach(c => {
        this.category = c.payload.val();
        this.category['key'] = c.key;
        this.categories.push(this.category);
        // console.log(this.categories);
      });
    });
  }

  ngOnInit() {
  }

}
