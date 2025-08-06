import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TitleComponent } from '../../../shared/components/title/title.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TitleComponent, RouterLink, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        rePassword: ['', [Validators.required]]
      }, { validators: passwordMatchValidator('password', 'rePassword') })
    })
  }

  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('passwordGroup')?.get('password');
  }
  get rePassword() {
    return this.form.get('passwordGroup')?.get('rePassword');
  }
  get passwordGroup() {
    return this.form.get('passwordGroup')
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;

    const userData = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.passwordGroup.password
    }
    this.authService.register(userData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) =>{
        this.errorMessage = err;
      }
    })
  }

}
