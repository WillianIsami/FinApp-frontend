import { Component, OnInit } from '@angular/core';
import { HeaderModule, NavModule, ButtonModule } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

interface NavRoute {
  path: string;
  label: string;
  roles: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderModule,
    IconDirective,
    NavModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit {
  userRole = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  allRoutes: NavRoute[] = [
    // Common routes
    { path: '/home', label: 'Home', roles: ['SELLER', 'MANAGER', 'BOSS', 'ADMIN'] },
    { path: '/about', label: 'About', roles: ['SELLER', 'MANAGER', 'BOSS', 'ADMIN'] },

    // Seller routes
    { path: '/seller/dashboard', label: 'Dashboard', roles: ['SELLER'] },
    { path: '/seller/inventory', label: 'Inventory', roles: ['SELLER'] },
    { path: '/seller/orders', label: 'Orders', roles: ['SELLER'] },

    // Manager routes
    { path: '/manager/dashboard', label: 'Dashboard', roles: ['MANAGER'] },
    { path: '/manager/employees', label: 'Team Management', roles: ['MANAGER'] },
    { path: '/manager/reports', label: 'Reports', roles: ['MANAGER'] },

    // Boss routes
    { path: '/boss/dashboard', label: 'Dashboard', roles: ['BOSS'] },
    { path: '/boss/analytics', label: 'Analytics', roles: ['BOSS'] },
    { path: '/boss/performance', label: 'Performance', roles: ['BOSS'] },

    // Admin routes
    { path: '/admin/settings', label: 'Settings', roles: ['ADMIN'] },
  ];


  logout() {
    this.authService.logout();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
