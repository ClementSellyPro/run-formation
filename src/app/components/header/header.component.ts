import { Component } from '@angular/core';
import {UserButtonComponent} from './user-button/user-button.component';

@Component({
  selector: 'app-header',
  imports: [UserButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
