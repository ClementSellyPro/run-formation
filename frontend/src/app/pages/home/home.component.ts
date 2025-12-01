import { Component } from '@angular/core';
import {FormationCardComponent} from './formation-card/formation-card.component';

@Component({
  selector: 'app-home',
  imports: [FormationCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
