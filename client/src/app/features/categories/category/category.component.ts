import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [TitleComponent, ProductCardComponent, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  category!: string;

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')!;

    this.productService.getByCategory(this.category).subscribe({
      next: (products) => this.products = products
    })
  }
}
