import { ShoppingCart } from './shopping-cart';

export class Order {

    datePlaced;
    items;

    constructor(public userId: string, public shipping: any, cart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = cart.items.map(i => {
            return {
                product: {
                    title: i.product.title,
                    imageurl: i.product.imageurl,
                    price: i.product.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            };
        });
    }
}