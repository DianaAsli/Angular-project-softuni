import { Component, inject } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    const userData = {
      email: formValue.email,
      password: formValue.password
    }
    // const loginData = this.form.value;
    // console.log('login data', loginData);

    this.authService.login(userData).subscribe({
      next: () => this.router.navigate(['/'])
      //errorsss!!!
    })

  }
}
