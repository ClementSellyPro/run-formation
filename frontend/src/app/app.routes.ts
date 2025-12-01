import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {LoginComponent} from './pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  }
];
