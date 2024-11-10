import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () =>
      import('./features/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: "seller",
    loadChildren: () =>
      import('./features/seller/seller-routing.module').then(m => m.SellerRoutingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: "SELLER"}
  },
  {
    path: "manager",
    loadChildren: () =>
      import('./features/manager/manager-routing.module').then(m => m.ManagerRoutingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: "MANAGER"}
  },
  {
    path: "boss",
    loadChildren: () =>
      import('./features/boss/boss-routing.module').then(m => m.BossRoutingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: "BOSS"}
  },
  {
    path: "admin",
    loadChildren: () =>
      import('./features/admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: "ADMIN"}
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
