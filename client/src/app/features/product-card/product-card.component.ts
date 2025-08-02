import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
}
