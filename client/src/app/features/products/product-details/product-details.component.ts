import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { CommentListComponent } from "../../comments/comment-list/comment-list.component";
import { FavouritesService } from '../../../core/services/favourites.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TitleComponent, CommentListComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductService);
  private favouriteService = inject(FavouritesService);
  private route = inject(ActivatedRoute);
  authService = inject(AuthService);

  product = signal<Product | null>(null);
  userId?: string;

  selectedImage: string = '';

  isFavourite = computed(() => {
    const prod = this.product();
    if (!prod || !this.userId) return false;
    return this.favouriteService.favourites().some(
      f => f.product._id === prod?._id && f.userId === this.userId
    );
  });

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user._id;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(id).subscribe({
        next: (prod) => {
          this.product.set(prod);
        },
        error: (err) => console.log('error loading th eproduct', err)
      })
    }
  }

  toggleFavourite() {
    const prod = this.product();
    if (!prod || !this.userId) return;

    const favs = this.favouriteService.favourites();
    const existingFav = favs.find(f => f.product._id === prod?._id && f.userId === this.userId)

    if (existingFav) {
      this.favouriteService.removeFavourite(existingFav._id);
    } else {
      this.favouriteService.addFavourite(prod, this.userId);
    }
  }

}
