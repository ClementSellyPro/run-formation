import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service.ts.service';

@Component({
  selector: 'app-user-button',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.css'
})
export class UserButtonComponent {
  isMenuOpen = false;
  @ViewChild('container') container!: ElementRef;

  constructor(private authService: AuthService,) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.authService.logout();
  }

  // Referme le menu si l'utilisateur clique en dehors
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const clickedInside = this.container.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}
