import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { Product } from '../../../shared/models/product.model';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [ProductCardComponent, TitleComponent],
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
