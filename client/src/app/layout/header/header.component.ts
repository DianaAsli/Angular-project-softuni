import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isDropDownOpen: boolean = false;
  isLoggedIn = this.authService.isLoggedIn;

  toggleDropDown() {
    this.isDropDownOpen = !this.isDropDownOpen
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
