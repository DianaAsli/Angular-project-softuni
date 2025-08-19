import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Favourite } from '../../shared/models/favourite.model';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private readonly apiUrl = "http://localhost:3030/data/favourites"
  favourites = signal<Favourite[]>([]);

  constructor(private http: HttpClient) { this.loadFavourites() }

loadFavourites(): void {
    this.http.get<Favourite[]>(this.apiUrl).subscribe({
      next: favs => this.favourites.set(favs),
      error: err => console.log('Error loading favourites', err)
    });
  }

  addFavourite(product: Product, userId: string): void {
    this.http.post<Favourite>(this.apiUrl, { product, userId }).subscribe({
      next: newFav => this.favourites.update(prev => [...prev, newFav]),
      error: err => {
        console.log('Error adding to favourites', err);
      }
    })
  }
    removeFavourite(favouriteId: string): void {
    this.http.delete(`${this.apiUrl}/${favouriteId}`).subscribe({
      next: () => this.favourites.update(prev => prev.filter(f => f._id !== favouriteId)),
      error: err => console.log('Error removing favourite', err)
    });
  }
}
