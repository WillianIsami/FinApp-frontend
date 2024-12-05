import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../components/primary-input/primary-input.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { BaseFormComponent } from '../components/base-form.component';

interface UserForm {
  username: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
      console.log("Passwords do not match")
      return { passwordMismatch: true };
    }
    console.log("Passwords match")
    return null;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    AuthLayoutComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignUpComponent extends BaseFormComponent {
  userForm!: FormGroup<UserForm>;

  constructor(
    private authService: AuthService,
    private router: Router,
    toastService: ToastrService,
  ) {
    super(toastService)
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required]),
    }, { validators: passwordMatchValidator() });
  }

  protected getControlErrorMessage(field: string, errors: any): string | null {
    switch (field) {
      case 'username':
        if (errors['required']) return 'Username is required';
        break;
      case 'email':
        if (errors['required']) return 'Email is required';
        if (errors['email']) return 'Please enter a valid email address';
        break;
      case 'password':
        if (errors['required']) return 'Password is required';
        if (errors['minlength']) return 'Password must be at least 6 characters long';
        break;
      case 'passwordConfirm':
        if (errors['required']) return 'Please confirm your password';
        break;
      default:
        return null;
    }
    return null;
  }

  submit() {
    if (this.userForm.invalid) {
      console.log("User form invalid");
      this.displayErrorMessages(this.userForm);
      return;
    }
    console.log("Valid user form");

    this.authService.signup(this.userForm.value.username, this.userForm.value.email, this.userForm.value.password).subscribe({
      next: () => this.toastService.success("SignUp successful"),
      error: () => this.toastService.error("Unexpected error! Please try again later")
    }
    );
  }

  navigate() {
    this.router.navigate(["auth/login"])
  }
}
