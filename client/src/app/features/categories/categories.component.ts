import { Component } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TitleComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [{
    name: 'Earings',
    image: 'images/earings.jpg'
  },
  {
    name: 'Bracelets',
    image: 'images/bracelet.png'
  },
  {
    name: 'Rings',
    image: 'images/rings.png'
  },
  {
    name: 'Necklaces',
    image: 'images/necklaces.jpg'
  },
  {
    name: 'Accessories',
    image: 'images/accessoaries.jpg'
  },
]
}
