import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { CommentListComponent } from "../../comments/comment-list/comment-list.component";


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TitleComponent, CommentListComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product?: Product;
  isFavourite: boolean = false;

  selectedImage: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(id).subscribe({
        next: (prod) => this.product = prod,
        error: (err) => console.log('error loading th eproduct', err)

      })
    }
  }
}
