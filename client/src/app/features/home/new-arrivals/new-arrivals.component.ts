import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { Product } from './../../../shared/models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css'
})
export class NewArrivalsComponent implements OnInit{
  newArrivals: Product[] = []

  constructor(private productService : ProductService){}

  ngOnInit(): void {
    this.productService.getNewArrivals().subscribe(products => {
      this.newArrivals = products;
      console.log('new arrivals', this.newArrivals);
      
    })
  }
}
