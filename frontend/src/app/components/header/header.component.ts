import { Component } from '@angular/core';
import {UserButtonComponent} from './user-button/user-button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [UserButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
