import { Component, OnInit } from '@angular/core';
import { CartService } from '../../src/app/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartCount().subscribe((count) => {
      this.cartCount = count;
    });
  }
}
