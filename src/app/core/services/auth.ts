import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface LoginResponse{
  message : string;
  token : string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5012/api';

  login(email: string, password: string){
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email, 
      password
    });
  }
}
