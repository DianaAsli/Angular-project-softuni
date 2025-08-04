import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TitleComponent } from '../../../shared/components/title/title.component';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TitleComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.form.value);

  }

}
