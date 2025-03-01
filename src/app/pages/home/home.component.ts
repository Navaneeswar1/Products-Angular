import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string | null = null;
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.productService.getProductsByCategory(category).subscribe((data) => {
      this.products = data;
    });
  }
}
