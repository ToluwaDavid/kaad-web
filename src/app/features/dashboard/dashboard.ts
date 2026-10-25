import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private auth = inject(Auth);
  private router = inject(Router);


  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
