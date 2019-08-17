import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  addProduct(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){
    return this.db.list('/products');
  }

}
