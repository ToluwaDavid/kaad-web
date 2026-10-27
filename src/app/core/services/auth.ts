import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'; 
import { environment } from '../../../environments/environment';


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
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'kaadi-token';
  private readonly apiUrl = environment.apiUrl;

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
    }).pipe(
      tap((res)=>{
        if(res.token){
          this.saveToken(res.token)
        }
      })
    );
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  logout(): void{
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() : boolean {
     return !!this.getToken() 
  }
}
