import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3030/jsonstore/products';

  constructor(private http: HttpClient) { }

  getBestSellers() {
    return this.http.get<{ products: Record<string, Product> }>(this.apiUrl).pipe(
      map(response => {
        const productsArray = Object.values(response.products);

        return productsArray.filter(p => p.bestSeller === true).slice(0, 5);
      }))
  }

}
