import { Component, inject, OnInit } from '@angular/core';
import { FavouritesService } from '../../../../core/services/favourites.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent implements OnInit{
  private favouriteService = inject(FavouritesService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  user: User | null = null;
  profileForm!: FormGroup;

  favourites = this.favouriteService.favourites;

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      username: [''],
      email: [{ value: '', disabled: true }],
      password: ['']
    });

    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.user = user;

        this.profileForm.patchValue({
          username: user.username,
          email: user.email,
          password: ''
        })
      },
      error: (err) => {
        console.log('Error loading user data', err);
      }
    })
  }
}
