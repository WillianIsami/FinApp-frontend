import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PrimaryInputComponent } from '../components/primary-input/primary-input.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';

interface UserForm {
  email: FormControl,
  password: FormControl
}

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    AuthLayoutComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm!: FormGroup<UserForm>;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    this.authService.login(this.userForm.value.email, this.userForm.value.password).subscribe({
      next: () => this.toastService.success("Login successful"),
      error: () => this.toastService.error("Unexpected error! Please try again later")
    });
  }

  navigate() {
    this.router.navigate(["auth/signup"]);
  }
}
