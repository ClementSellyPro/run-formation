import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];
