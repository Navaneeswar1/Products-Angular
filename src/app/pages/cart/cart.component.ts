import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: any; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.getTotalPrice().subscribe((price) => {
      this.totalPrice = price;
    });
  }

  increaseQuantity(product: any) {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
