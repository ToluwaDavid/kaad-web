import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private auth = inject(Auth);

  email = signal('');
  password = signal('');
  showPassword = signal(false);
  loading = signal(false);
  message = signal('');

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    const email = this.email().trim();
    const password = this.password().trim();

    if (!email || !password) {
      this.message.set('Registration failed: Email and password are required.');
      return;
    }

    this.loading.set(true);

    
    this.auth.register(email, password).subscribe({
      next: (response) => {
        this.message.set('Account created! You can now sign in.');
        this.loading.set(false);    
      },
      error: (error) => {
        this.message.set(`Registration failed: ${error.error?.message || error.message}`);
        this.loading.set(false);
      }
    });
  }
}
