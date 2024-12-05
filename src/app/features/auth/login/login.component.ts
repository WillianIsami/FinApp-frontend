import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PrimaryInputComponent } from '../components/primary-input/primary-input.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { BaseFormComponent } from '../components/base-form.component';

interface UserForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    AuthLayoutComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent extends BaseFormComponent{
  userForm!: FormGroup<UserForm>;

  constructor(
    private authService: AuthService,
    private router: Router,
    toastService: ToastrService,
  ) {
    super(toastService)
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  protected getControlErrorMessage(field: string, errors: any): string | null {
    switch (field) {
      case 'email':
        if (errors['required']) return 'Email is required';
        if (errors['email']) return 'Please enter a valid email address';
        break;
      case 'password':
        if (errors['required']) return 'Password is required';
        if (errors['minlength']) return 'Password must be at least 6 characters long';
        break;
      default:
        return null;
    }
    return null;
  }

  submit() {
    if (this.userForm.invalid) {
      this.displayErrorMessages(this.userForm); // Call the inherited method to display errors
      return;
    }
    this.authService.login(this.userForm.value.email, this.userForm.value.password).subscribe({
      next: () => this.toastService.success("Login successful"),
      error: () => this.toastService.error("Unexpected error! Please try again later")
    });
  }

  navigate() {
    this.router.navigate(["auth/signup"]);
  }
}
