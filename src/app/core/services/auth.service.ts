import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment';
import { Logger } from './logger.service';
import { LoginResponse } from '../../shared/models/login-response.model';

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

  getToken(): string {
    return sessionStorage.getItem('auth-token') as string;
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
    this.logger.log("Token removed");
  }

  isLoggedIn(): boolean {
    this.logger.log(`Is logged in: ${!!sessionStorage.getItem('token')}`);
    return !!sessionStorage.getItem('token');
  }

  getUserRole(): string {
    return sessionStorage.getItem("user-role") as string;
  }

  isAuthorized(role: string): boolean {
    const roles = ['SELLER', 'MANAGER', 'BOSS'];
    const userRole = this.getUserRole() || "";
    this.logger.log(`userrole: ${userRole} - ${typeof(userRole)}`)
    return roles.indexOf(userRole.toUpperCase()) >= roles.indexOf(role.toUpperCase());
  }
}
