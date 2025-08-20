import { Component, inject } from '@angular/core';
import { FavouritesService } from '../../../../core/services/favourites.service';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
private favouriteService = inject(FavouritesService);
favourites = this.favouriteService.favourites;
}
