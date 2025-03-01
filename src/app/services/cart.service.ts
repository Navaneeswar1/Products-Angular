import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: any; quantity: number }[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private totalPrice = new BehaviorSubject<number>(0);

  getCartItems() {
    return this.cartItems;
  }

  getCartCount() {
    return this.cartCount.asObservable();
  }

  getTotalPrice() {
    return this.totalPrice.asObservable();
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart();
  }

  removeFromCart(productId: number) {
    const index = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );
    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.updateCart();
    }
  }

  updateCart() {
    const totalCount = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    this.cartCount.next(totalCount);
    this.totalPrice.next(totalPrice);
  }
}
