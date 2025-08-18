import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  activeTab: 'info' | 'comments' | 'favourites' = 'info'
  user: User | null = null;
  profileForm!: FormGroup;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      username: [''],
      email:[{value:'', disabled: true}],
      password:['']
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
