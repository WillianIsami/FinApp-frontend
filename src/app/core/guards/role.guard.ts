import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'] as string;
    if (this.authService.isAuthorized(expectedRole)) {
      return true;
    }
    this.redirectBasedOnRole(this.authService.getUserRole());
    return false;
  }

  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'SELLER':
        this.router.navigate(['/seller/dashboard']);
        break;
      case 'MANAGER':
        this.router.navigate(['/manager/dashboard']);
        break;
      case 'BOSS':
        this.router.navigate(['/boss/dashboard']);
        break;
      default:
        this.router.navigate(['/auth/login']);
        break;
    }
  }
}
