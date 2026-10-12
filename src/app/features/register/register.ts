import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = signal('');
  password = signal('');

  onSubmit() {
    console.log('Registering with email:', this.email(), 'and password:', this.password());
  }
}
