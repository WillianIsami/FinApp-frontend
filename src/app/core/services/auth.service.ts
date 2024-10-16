import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment';
import { Logger } from './logger.service';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private logger: Logger,
  ) {
    this.logger.log("AuthService initialized");
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/signup`, { username, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
      })
    );
  }

  login(username: string, email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { username, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.logger.log("Token removed")
  }

  isLoggedIn(): boolean {
    this.logger.log(`Is logged in: ${!!localStorage.getItem('token')}`);
    return !!localStorage.getItem('token');
  }
}
