import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  loading = signal(false);
  message = signal('');

  togglePassword(){
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    this.loading.set(true);

    console.log('Registering with email:', this.email(), 'and password:', this.password());
  }
}
