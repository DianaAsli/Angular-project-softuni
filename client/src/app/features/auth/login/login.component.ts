import { Component, inject } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);

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
    const loginData = this.form.value;
    console.log('login data', loginData);

  }
}
