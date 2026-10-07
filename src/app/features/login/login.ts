import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = signal('');

  password = signal('');

  onSubmit() {
    console.log('Login Attempt:', this.email(), this.password());
  }
}
