import { Component } from '@angular/core';
import { ProductCardComponent } from "../../product-card/product-card.component";

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  testProduct = {
    id: "fb352199-bcbc-4e1d-a1dc-ed346a6fb49f",
    title: "Golden earings with Diamonds",
    description: "Elegant 18K gold ring with a brilliant-cut diamond.",
    price: 999,
    category: "Earings",
    subcategory: ["Gold", "Diamonds"],
    imageUrls: ["https://us.missoma.com/cdn/shop/files/fine-diamond-ovate-mini-hoop-earrings-14k-solid-golddiamond-earrings-missoma-745568.jpg?v=1720561944&width=1000",
      "https://us.missoma.com/cdn/shop/files/fine-diamond-ovate-mini-hoop-earrings-14k-solid-golddiamond-earrings-missoma-637372.jpg?v=1720560839&width=1000",
      "https://us.missoma.com/cdn/shop/files/fine-diamond-ovate-mini-hoop-earrings-14k-solid-golddiamond-earrings-missoma-821902.jpg?v=1720560667&width=1000"],
    createdAt: "2020-03-10T12:00:00Z",
    updatedAt: "2024-03-11T15:30:00Z",
    bestSeller: false,
    rating:4
  }
}
