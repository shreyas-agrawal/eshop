import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cardId = await this.getOrCreateId();
    return this.db.object('/shopping-carts/' + cardId).snapshotChanges().map(cart => new ShoppingCart(cart.payload.val()['items']));
  }

  async addToCart(Product) {
    this.updateCartQuantity(Product, 1);
  }

  async removeFromCart(Product){
    this.updateCartQuantity(Product, -1);
  }

  async clearCart() {
    const cardId = await this.getOrCreateId();
    this.db.object('/shopping-carts/' + cardId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      time : new Date().getTime()
    });
  }

  private async getOrCreateId() {
    const cardId = localStorage.getItem('cardId');
    if (!cardId) {
      const result = await this.create();
      localStorage.setItem('cardId', result.key);
      return result.key;
    }
    return cardId;
  }

  private getItem(cardId, productId){
    return this.db.object('/shopping-carts/' + cardId + '/items/' + productId);
  }

  private async updateCartQuantity(Product, change){
    const cardId = await this.getOrCreateId();
    console.log(cardId);
    const items = this.getItem(cardId, Product.key);
    items.snapshotChanges().take(1).subscribe(item => {
      // console.log(item.payload.val());
      if (item.key) {
        items.update({ quantity : item.payload.val()['quantity'] + change });
      } else {
        items.update({ product: Product, quantity : 1 });
      }
    });
  }

}
