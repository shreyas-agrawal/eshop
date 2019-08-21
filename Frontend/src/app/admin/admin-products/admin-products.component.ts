import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products = [];
  filteredProducts;
  product = {};

  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts(){
    this.productService.getAllProducts().snapshotChanges().
    subscribe((products) => {
      products.forEach(p => {
        // console.log(p.payload.val());
        this.product = p.payload.val();
        this.product['key'] = p.key;
        this.products.push(this.product);
      });
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.dataSource);
    });
  }

  filter(query: string){
    console.log(query);
    this.dataSource.filter = query.trim();
  }

}
