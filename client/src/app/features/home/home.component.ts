import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { BestSellersComponent } from "./best-sellers/best-sellers.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, BestSellersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
