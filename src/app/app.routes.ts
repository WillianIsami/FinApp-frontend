import { Routes } from '@angular/router';
import { SignUpComponent } from './features/auth/pages/signup/signup.component';
import { LoginComponent } from './features/auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
];
