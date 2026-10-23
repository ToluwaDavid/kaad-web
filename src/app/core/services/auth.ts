import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'; 


export interface LoginResponse{
  message : string;
  token : string;
}

export interface RegisterResponse{
  message : string;
  token ?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private tokenKey = 'kaadi-token';
  private apiUrl = 'http://localhost:5012/api';

  login(email: string, password: string){
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email, 
      password
    }).pipe( tap(res => {
      this.saveToken(res.token);
    })
    );
  }

   register(email: string, password: string){
   return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, {
      email, 
      password
    });
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  logout(){
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() : boolean {
     return !!this.getToken() 
  }
}
