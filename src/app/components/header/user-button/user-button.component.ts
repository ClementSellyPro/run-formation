import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-button',
  imports: [
    NgIf
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

  // Referme le menu si l'utilisateur clique en dehors
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const clickedInside = this.container.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }
}
