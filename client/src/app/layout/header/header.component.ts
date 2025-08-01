import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = true;
  isDropDownOpen: boolean = false;

  toggleDropDown() {
    this.isDropDownOpen = !this.isDropDownOpen
  }

  logout() {
    this.isLoggedIn = false;
  }
}
