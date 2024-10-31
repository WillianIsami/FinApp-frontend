import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignUpComponent } from './features/auth/signup/signup.component';
import { LoginComponent } from './features/auth/login/login.component';

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
    // canActivate: [AuthGuard],
    // data: { expectedRole: 'SELLER' },
    component: LoginComponent
  },
];
