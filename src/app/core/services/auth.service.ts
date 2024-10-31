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
        sessionStorage.setItem("user-role", value.userRole);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("user-role", value.userRole);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.logger.log("Token removed")
  }

  isLoggedIn(): boolean {
    this.logger.log(`Is logged in: ${!!sessionStorage.getItem('token')}`);
    return !!sessionStorage.getItem('token');
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('user-role');
  }

  hasRole(expectedRole: string): boolean {
    return this.getUserRole()?.toLowerCase() === expectedRole.toLowerCase();
  }
}
