import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup({ username: this.username, password: this.password }).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
