import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FavouritesService } from '../../../core/services/favourites.service';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent  {

}
