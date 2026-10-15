import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(Auth);

  email = signal('');
  password = signal('');
  message = signal('');
  showPassword = signal(false);
  isSubmitting = signal(false);

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    const email = this.email().trim();
    const password = this.password().trim();

    if(!email || !password){
      this.message.set('Login failed: Email and password are required.');
      return;
    }

    this.isSubmitting.set(true);

    this.auth.login(email, password).subscribe({
      next: () => {
        this.message.set('Login successful!');
        this.isSubmitting.set(false);
      },
      error: (err) => {
        const errorMessage = err?.error?.message || err?.message || 'try again';
        this.message.set
        (`Login failed: ${errorMessage}`);
        this.isSubmitting.set(false);
      },
    });
  }
}
