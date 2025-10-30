import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: false,
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  mode: 'signin' | 'signup' = 'signin';
  error = '';

  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/),
        ],
      ],
      confirm: [''],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  switchAuthMode() {
    this.mode = this.mode === 'signin' ? 'signup' : 'signin';
    this.error = '';
    this.form.reset();
  }

  submit() {
    this.error = '';
    const { email, password, confirm } = this.form.value;

    if (this.mode === 'signup') {
      if (password !== confirm) {
        this.error = 'Passwords do not match';
        return;
      }
      if (this.form.invalid) return;
      this.auth.register(email!, password!).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => (this.error = e.message || 'Registration failed'),
      });
    } else {
      if (this.form.get('email')?.invalid || this.form.get('password')?.invalid) return;
      this.auth.login(email!, password!).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => (this.error = e.message || 'Login failed'),
      });
    }
  }
}
