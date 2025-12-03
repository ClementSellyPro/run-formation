import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'run-formation';
  hideHeader = false;

  constructor(private router: Router,) {
    this.router.events.subscribe((event) => {
      const url = this.router.url;

      const routes = ['/', '/auth/login'];

      this.hideHeader = routes.includes(url);
    })
  }
}
