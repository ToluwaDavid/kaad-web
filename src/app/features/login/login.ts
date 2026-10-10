import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private auth = inject(Auth);


  email = signal('');
  password = signal('');
  message = signal('');

  onSubmit() {
    this.auth.login(this.email(), this.password()).subscribe(
    {  
      next: (res) => {
      this.message.set('Login successful!');
    },
      error: (err) => {
        this.message.set('Login failed: ' + (err.error?.message || 'try again'))
      }
    }
    )
  }
}
