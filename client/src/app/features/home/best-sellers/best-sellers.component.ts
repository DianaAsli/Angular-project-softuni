import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../product-card/product-card.component";
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent implements OnInit {
  bestSellers: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getBestSellers().subscribe(products => {
      this.bestSellers = products;
      console.log('bestsellers', this.bestSellers);
    })
  }
}
