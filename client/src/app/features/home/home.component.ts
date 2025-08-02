import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { BestSellersComponent } from "./best-sellers/best-sellers.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, BestSellersComponent, NewArrivalsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
