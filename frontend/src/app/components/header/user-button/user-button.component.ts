import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Referme le menu si l'utilisateur clique en dehors
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const clickedInside = this.container.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeMenu();
    }
  }

  protected readonly close = close;
}
