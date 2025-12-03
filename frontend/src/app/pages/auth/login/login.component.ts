import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service.ts.service';
import {AuthResponse} from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: '../auth.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: AuthResponse) => {
        const role = response.user.role as 'USER' | 'ADMIN';

        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard'])
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
