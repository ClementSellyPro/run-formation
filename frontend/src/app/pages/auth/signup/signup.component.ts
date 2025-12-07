import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: '../auth.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.errorMessage = "";

    if (this.signupForm.invalid) return;

    this.authService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.status === 409) {
          this.errorMessage = "Cette adresse e-mail existe déjà.";
        } else {
          this.errorMessage = "Une erreur est survenue";
        }
        console.error(error);
      }
    })
  }
}
