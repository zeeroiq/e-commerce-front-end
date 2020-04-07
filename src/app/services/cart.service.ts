import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];
  // Subject is a sub-class of Observable, using it to publish event and it will be sent to all of the subscribers.
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0) {
      // find the item in the cart based on item id
      for(let cart_item of this.cartItems) {

        if(cart_item.id === cartItem.id) {
          existingCartItem = cart_item;
          break;
        }
      }      
      // check if we find it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(cartItem);
    }
    // compute cart total quantity and price
    this.computeCartTotals();
  }

  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values, all of the subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart item to console
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice.toFixed(2)}`);
    }

    console.log(`total price: ${totalPriceValue.toFixed(2)}, total quantity: ${totalQuantityValue}`)
    console.log('-------------------------------------------------')
  }
}
