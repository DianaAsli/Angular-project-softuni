import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { CommentFormComponent } from "../../comments/comment-form/comment-form.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TitleComponent, CommentFormComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  
  product?: Product

  selectedImage: any

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.getOne(id).subscribe({
        next: (prod) => this.product = prod,
        error: (err) => console.log('error loading th eproduct', err)
        
      })
    }
  }
}
