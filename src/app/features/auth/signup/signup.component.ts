import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../components/primary-input/primary-input.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';

interface UserForm {
  username: FormControl,
  email: FormControl,
  password: FormControl
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

export class SignUpComponent {
  @Input() errorMessage: string = '';
  @Output() onSubmit = new EventEmitter();
  userForm!: FormGroup<UserForm>;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  signup() {
    this.authService.signup(this.userForm.value.username, this.userForm.value.email, this.userForm.value.password ).subscribe({
      next: () => this.toastService.success("SignUp successful"),
      error: () => this.toastService.error("Unexpected error! Please try again later")
    }
    );
  }

  navigate() {
    this.router.navigate(["auth/login"])
  }
}
